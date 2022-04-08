function updateDynamicCache(dynamicCache, request, response) {
    if (response.ok) {
        return caches.open(dynamicCache)
            .then(cache => {
                cache.put(request, response.clone())

                return cache.clone()
            })
    }

    return response
}
