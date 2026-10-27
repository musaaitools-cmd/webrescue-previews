/* WebRescue preview engine v2. Uses GSAP + ScrollTrigger (loaded locally, deferred) when motion is allowed.
   Without JS, or with prefers-reduced-motion, everything is simply visible. */
(function(){
  var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=d.querySelector('.nav');
  function onScroll(){nav&&nav.classList.toggle('scrolled',scrollY>40)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Pointer-follow glow on service cards (cheap: one CSS var update)
  d.querySelectorAll('.svc').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});

  // Demo form (non-functional placeholder)
  d.querySelectorAll('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(ev){ev.preventDefault();var m=f.querySelector('.form-msg');if(m)m.textContent='Demo only: on your live site this form would send you the lead instantly.'})});

  function fmt(v,dec){return v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
  var g=window.gsap,ST=window.ScrollTrigger;
  if(reduce||!g||!ST){root.classList.remove('motion');return}
  g.registerPlugin(ST);

  // Hero intro
  g.set('.hero h1 .line>span',{yPercent:110,y:0});
  var tl=g.timeline({defaults:{ease:'expo.out',duration:1.2}});
  tl.to('.hero h1 .line>span',{yPercent:0,stagger:.11,duration:1.3},0.1)
    .fromTo('.hero [data-h]',{opacity:0,y:24},{opacity:1,y:0,stagger:.08},0.35)
    .fromTo('.hero-media .frame',{clipPath:'inset(12% 12% 12% 12% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 28px)',duration:1.6},0.15)
    .fromTo('.hero-media .frame img',{scale:1.25},{scale:1,duration:2},0.15)
    .fromTo('.float',{opacity:0,y:30,scale:.92},{opacity:1,y:0,scale:1,stagger:.15,ease:'back.out(1.6)',duration:.9},0.9);

  // Gentle float loop on hero cards
  g.to('.float.f1',{y:-10,duration:3,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2});
  g.to('.float.f2',{y:10,duration:3.4,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2.2});

  // Scroll reveals, batched so groups stagger in together
  ST.batch('[data-r],.reveal',{start:'top 88%',once:true,onEnter:function(els){g.to(els,{opacity:1,y:0,duration:1,ease:'expo.out',stagger:.09,overwrite:true})}});

  // Parallax images
  g.utils.toArray('[data-parallax]').forEach(function(img){
    g.fromTo(img,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:img.parentNode,start:'top bottom',end:'bottom top',scrub:true}});
  });
  g.to('.hero-media .frame img',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  // Process line draws as you scroll
  var tr=d.querySelector('.steps .track i');
  if(tr)g.fromTo(tr,{scaleX:0},{scaleX:1,duration:1.6,ease:'power2.inOut',scrollTrigger:{trigger:'.steps',start:'top 82%',once:true}});

  // Counters
  d.querySelectorAll('[data-count]').forEach(function(el){
    var raw=el.getAttribute('data-count'),end=parseFloat(raw);if(isNaN(end))return;
    var dec=(raw.split('.')[1]||'').length,o={v:0};
    ST.create({trigger:el,start:'top 92%',once:true,onEnter:function(){g.to(o,{v:end,duration:1.8,ease:'power3.out',onUpdate:function(){el.textContent=fmt(o.v,dec)}})}});
  });

  // Magnetic primary buttons (desktop pointers only)
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    d.querySelectorAll('.btn-primary').forEach(function(b){
      var x=g.quickTo(b,'x',{duration:.5,ease:'power3'}),y=g.quickTo(b,'y',{duration:.5,ease:'power3'});
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.18);y((e.clientY-r.top-r.height/2)*.25)});
      b.addEventListener('pointerleave',function(){x(0);y(0)});
    });
  }
  addEventListener('load',function(){ST.refresh()});
})();
