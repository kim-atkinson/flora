const spaceId = "o9qhtjm3imri"
const environmentId = "master"
const accessToken = "tJYnI6gd67AdMde5a5gF-tqY_VIBxCiP8DqXITc-AMY"

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

const sectionTag = document.querySelector("section.grid")

const grabData = function () {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        // store the assets somewhere
        const assets = data.includes.Asset
        // turn contentful datainto someting more useful
        return data.items.map(item => {
            let imageUrl = "image1.jpg"

            const imageId = item.fields.image.sys.id

            const imageData = assets.find(asset => {
                return asset.sys.id == imageId
            })

            if (imageData) {
                imageUrl = imageData.fields.file.url
            }

            item.fields.image = imageUrl
            return item.fields
        })

    })
}

// run this grabData function on load
grabData().then(data => {
    // in here do someting with the returned data
    console.log(data)

    // remove the loader

    sectionTag.innerHTML = ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
        <div class="item">
            <img src ="${item.image}">
            <div class="title">
                <h2 class="menu-heading__item">${item.title}</h2>
                <p class="menu-price">${item.price}</p>
            </div>
                <p class="menu-description">${item.description}</p>
        </div>
        `
    })
})




