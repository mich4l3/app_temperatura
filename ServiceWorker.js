const CACHE_NAME='temperature-converter-v1'

//aggiunge un event listener per l'evento install
//l'evento install è il primo evento del service worker
//qui andiamo a scegliere quali file inserire nella cache



self.addEventListener("install", event => {
    event.waitUntil((async () => {
        //caches è l'API JavaScript per accedere alla cache
        //caches.open(X) accede alla cache con nome X
        //se non esiste, la crea
    const cache = await caches.open(CACHE_NAME);
    //cache.addALL(A) aggiunge alla cache tutti gli elementi 
    //nell'Array A; aggiungere un elemento significa accedere 
    //alla risorsa e immagazzinarla
    cache.addAll([
    '/',
    '/converter.js',
    '/converter.css'
    ]);
    })());
    });
    
    
//Step2 per ogni evento fetch
//accedo alla cache e m,i chiedo se la risorsa richiesta
//nell'evento fetch sia immagazzinata nella cache:se sì, la restituisco
//se non è nella cache, allora provo a richiederla al server
//e la aggiungo nella cache

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
    return cachedResponse;
    } else {
    try {
    const fetchResponse = await fetch(event.request);
    cache.put(event.request, fetchResponse.clone());
    return fetchResponse;
    } catch (e) {
    // errore
    }
    }
    })());
    });
    