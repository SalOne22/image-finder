export function getGalleryMarkup(photos = []) {
  return photos.reduce((markup, photo) => {
    return (
      markup +
      `
<li class="photo-card">
  <a href="${photo.largeImageURL}">
    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${photo.downloads}
      </p>
    </div>
  </a>
</li>`
    );
  }, '');
}
