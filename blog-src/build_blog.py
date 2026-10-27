#!/usr/bin/env python3
"""Builds cms/Blog.html, cms/Blog/<slug>.html and the blog entries in sitemap.xml
from blog-src/posts/*.md. Run from anywhere:  python3 blog-src/build_blog.py
Requires: pip install markdown"""
import os,re,sys,json,glob,html as H,datetime
import markdown
SITE='https://copper.asia'
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(HERE)
LOGO=SITE+'/UploadedImg/BannerImg/1465893454_banner01.jpg'   # same image the site's existing schema uses as logo
ORG='Teck Leong Industries Pte Ltd'
shell=open(os.path.join(HERE,'_shell.html'),encoding='utf-8').read()
shell=re.sub(r'<!--\s*(?:Mirrored from|Added by HTTrack|/Added by HTTrack)[^>]*?-->','',shell)
IDX_TITLE='Blog: Copper, Brass & Bronze Guides | Teck Leong Singapore'
IDX_DESC=('Practical guides on copper pipe, brass, bronze, shim plates and lead sheet from Teck Leong Industries, '
          'a Singapore metal stockist. New posts every week.')
def parse(path):
    raw=open(path,encoding='utf-8').read()
    m=re.match(r'---\s*\n(.*?)\n---\s*\n(.*)',raw,re.S)
    if not m: raise SystemExit('Missing front matter in '+path)
    meta={}
    for line in m.group(1).splitlines():
        if ':' in line: k,v=line.split(':',1); meta[k.strip()]=v.strip()
    for k in ('title','slug','date','description','h1'):
        if k not in meta: raise SystemExit('%s: missing "%s"'%(path,k))
    meta['body']=m.group(2); return meta
def atlink(m,pre):
    u=m.group(1)
    if u.startswith('#'): return m.group(0)
    last=u.split('/')[-1]
    if '.' not in last: u+='.html'
    return m.group(0).split('(')[0]+'('+pre+u+')'
def md2html(body,pre):
    body=re.sub(r'\]\(@([^)]+)\)',lambda m:']('+pre+m.group(1)+('' if '.' in m.group(1).split('/')[-1] else '.html')+')',body)
    return markdown.markdown(body,extensions=['tables','sane_lists'])
def fmt(d): return datetime.date.fromisoformat(d).strftime('%-d %B %Y')
def esc(x): return H.escape(x,quote=True)
def relprefix(s,pre):
    def r(m):
        u=m.group(2)
        if re.match(r'(https?:|//|/|#|mailto:|tel:|javascript:|data:)',u): return m.group(0)
        return '%s="%s%s"'%(m.group(1),pre,u)
    return re.sub(r'\b(href|src|action)="([^"]*)"',r,s)
def make(meta_title,desc,canon,og_type,content,ld,depth,image=None):
    s=shell
    if depth==2: s=relprefix(s,'../')
    s=re.sub(r'<title>.*?</title>','<title>%s</title>'%esc(meta_title),s,count=1,flags=re.S)
    s=re.sub(r'<meta[^>]+name="description"[^>]*/>','<meta name="description" content="%s"/>'%esc(desc),s,count=1)
    s=re.sub(r'<link[^>]*rel="canonical"[^>]*/>','<link href="%s" rel="canonical"/>'%canon,s,count=1)
    s=re.sub(r'<meta[^>]*property="og:(?:title|description|url|type|image)"[^>]*/>\s*','',s)
    s=re.sub(r'<meta[^>]*name="twitter:[^>]*/>\s*','',s)
    img=image or LOGO
    add=('<meta content="%s" property="og:title"/><meta content="%s" property="og:description"/><meta content="%s" property="og:url"/>'
         '<meta content="%s" property="og:type"/><meta content="%s" property="og:image"/>'
         '<meta content="summary_large_image" name="twitter:card"/><meta content="%s" name="twitter:title"/><meta content="%s" name="twitter:description"/>'
         '<meta content="%s" name="twitter:image"/>')%(esc(meta_title),esc(desc),canon,og_type,img,esc(meta_title),esc(desc),img)
    add+=''.join('<script type="application/ld+json">\n'+json.dumps(o,indent=2,ensure_ascii=False)+'\n</script>' for o in ld)
    s=s.replace('</head>',add+'</head>',1)
    s=s.replace('action="https://copper.asia/cms/Blog"','action="%s"'%canon)
    pat=re.compile(r'<div class="row"><div align="center" class="col-lg-12 col-md-12 col-sm-12">\s*<h1>\s*Updates</h1>.*?(<div class="hDiv">)',re.S)
    assert pat.search(s),'shell block not found'
    return pat.sub(lambda m:content+m.group(1),s,count=1)
posts=[parse(p) for p in sorted(glob.glob(os.path.join(HERE,'posts','[!_]*.md')))]
posts.sort(key=lambda m:m['date'],reverse=True)
def crumbs(items): return {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":i+1,"name":n,"item":u} for i,(n,u) in enumerate(items)]}
# ---- posts
for i,p in enumerate(posts):
    assert 30<=len(p['title'])<=60,'title length %d: %s'%(len(p['title']),p['title'])
    assert 110<=len(p['description'])<=160,'description length %d (%s)'%(len(p['description']),p['slug'])
    url='%s/cms/Blog/%s'%(SITE,p['slug']); img=p.get('image','')
    body=md2html(p['body'],'../../')
    others=[o for o in posts if o['slug']!=p['slug']][:3]
    rel=''
    if others: rel='<div class="blog-related"><h2>More from the blog</h2><ul>'+''.join('<li><a href="%s.html">%s</a></li>'%(o['slug'],esc(o['h1'])) for o in others)+'</ul></div>'
    hero=''
    if img:
        assert os.path.exists(os.path.join(ROOT,img)),'image not found: '+img
        hero='<img class="blog-hero" src="../../%s" alt="%s"/>'%(img,esc(p.get('image_alt',p['h1'])))
    content=('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 blog-wrap">'
      '<div class="breadcrumb">&gt; <a href="../../products.html">Products</a> | <a href="../Blog.html">Blog</a> | <a class="page_active" href="#">%s</a></div>'
      '<article class="blog-post"><h1>%s</h1><p class="blog-meta">Published %s &middot; %s</p>%s%s</article>%s'
      '<p><a href="../Blog.html">&larr; Back to the blog</a></p></div></div>')%(esc(p['h1']),esc(p['h1']),fmt(p['date']),ORG,hero,body,rel)
    ld=[{"@context":"https://schema.org","@type":"BlogPosting","headline":p['h1'],"description":p['description'],
         "datePublished":p['date'],"dateModified":p.get('modified',p['date']),"mainEntityOfPage":url,
         "image":[SITE+'/'+img] if img else [LOGO],"author":{"@type":"Organization","name":ORG,"url":SITE+'/'},
         "publisher":{"@type":"Organization","name":ORG,"logo":{"@type":"ImageObject","url":LOGO}}},
        crumbs([('Home',SITE+'/'),('Blog',SITE+'/cms/Blog'),(p['h1'],url)])]
    page=make(p['title']+' | Teck Leong' if False else p['title'],p['description'],url,'article',content,ld,2,SITE+'/'+img if img else None)
    open(os.path.join(ROOT,'cms','Blog',p['slug']+'.html'),'w',encoding='utf-8').write(page)
# ---- index
assert 30<=len(IDX_TITLE)<=60 and 110<=len(IDX_DESC)<=160
cards=''.join('<div class="blog-card"><h2><a href="Blog/%s.html">%s</a></h2><p class="blog-meta">%s</p><p>%s</p><p><a href="Blog/%s.html">Read more</a></p></div>'
    %(p['slug'],esc(p['h1']),fmt(p['date']),esc(p['description']),p['slug']) for p in posts) or '<p>New articles coming soon.</p>'
content=('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 blog-wrap"><h1>Blog</h1>'
  '<p class="blog-sub">Guides on copper, brass, bronze, shim plates and lead sheet from Teck Leong Industries.</p>%s</div></div>')%cards
ld=[{"@context":"https://schema.org","@type":"Blog","name":"Teck Leong Industries Blog","url":SITE+'/cms/Blog',"description":IDX_DESC,
     "publisher":{"@type":"Organization","name":ORG,"logo":{"@type":"ImageObject","url":LOGO}},
     "blogPost":[{"@type":"BlogPosting","headline":p['h1'],"url":'%s/cms/Blog/%s'%(SITE,p['slug']),"datePublished":p['date']} for p in posts]},
    crumbs([('Home',SITE+'/'),('Blog',SITE+'/cms/Blog')])]
open(os.path.join(ROOT,'cms','Blog.html'),'w',encoding='utf-8').write(make(IDX_TITLE,IDX_DESC,SITE+'/cms/Blog','website',content,ld,1))
# ---- sitemap (keep everything that is not a blog post, then add posts)
sp=os.path.join(ROOT,'sitemap.xml'); sm=open(sp,encoding='utf-8').read()
sm=re.sub(r'\s*<url>\s*<loc>%s/cms/Blog/[^<]*</loc>.*?</url>'%re.escape(SITE),'',sm,flags=re.S)
ins=''.join('\n  <url>\n    <loc>%s/cms/Blog/%s</loc>\n    <lastmod>%s</lastmod>\n  </url>'%(SITE,p['slug'],p.get('modified',p['date'])) for p in posts)
sm=sm.replace('</urlset>',ins+'\n</urlset>'); open(sp,'w',encoding='utf-8').write(sm)
print('built %d post(s) + index'%len(posts))
