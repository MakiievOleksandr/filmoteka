import { getRefs } from './get-refs';
const refs = getRefs();

const stopVideos = () => {
  document.querySelectorAll('iframe').forEach(video => {
    video.src = video.src;
  });
  document.querySelectorAll('video').forEach(video => {
    video.pause();
  });
};

refs.trailerOverlay.addEventListener('click', showVideo);
refs.closeVideoBtn.addEventListener('click', closeVideo);
refs.watchBtn.addEventListener('click', showVideo);

function videoTpl(trailer) {
  const { key, site } = trailer;

  return `<iframe class="iframe" width="100%" height="100%" src="https://www.${site}.com/embed/${key}?origin=https://asyrotenko.github.io" title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

export function renderVideoBox(videos) {
  const trailer = videos.find(video => video.name === 'Official Trailer' ?? {});
  if (!trailer) {
    refs.watchBtn.classList.add('not-active');
    refs.trailerOverlay.classList.add('not-active');
    return;
  }
  refs.insertVideoCont.insertAdjacentHTML('beforeend', videoTpl(trailer));
}

export async function showVideo() {
  refs.insertVideoCont.classList.add('is-active');
  refs.trailerBox.classList.add('is-active');
  refs.watchBtn.setAttribute('disabled', ' ');
  refs.closeVideoBtn.removeAttribute('disabled');
  refs.insertVideoCont.scrollIntoView();
}

export function closeVideo() {
  stopVideos();
  refs.insertVideoCont.classList.remove('is-active');
  refs.trailerBox.classList.remove('is-active');
  refs.closeVideoBtn.setAttribute('disabled', '');
  refs.watchBtn.removeAttribute('disabled');
}
