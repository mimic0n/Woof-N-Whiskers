(() => {
  const section = document.querySelector('#product-stories');
  if (!section) return;
  function openStory(hash, focus = false) {
    const story = Array.from(section.querySelectorAll('details')).find(item => `#${item.id}` === hash);
    if (!story) return;
    story.open = true;
    if (focus) story.querySelector('summary').focus({ preventScroll: true });
  }
  section.querySelectorAll('.product-story-bottom a').forEach(link => {
    link.addEventListener('click', () => openStory(link.hash, true));
  });
  window.addEventListener('hashchange', () => openStory(location.hash));
  openStory(location.hash);
})();
