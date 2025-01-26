import routes from '../routes.json';

document.addEventListener('click', (event) => {
  if (!event.target.matches('a')) {
    return;
  }

  navigate(event);
});

const navigate = (event) => {
  event.preventDefault();
  const href = event.target.href;

  // Make sure browser navigation is not blocked
  window.history.pushState({}, '', href);

  handleUrl();
};

const handleUrl = async () => {
  let path = window.location.pathname || '/';

  if (!routes[path]) {
    path = '/404';
  }

  const route = routes[path];
  document.title = 'Ironforge | ' + route.title;
  document.querySelector('meta[name="description"]').setAttribute('content', route.description);
  const routeFile = `/pages${path === '/' ? '' : path}/index.html`;

  const html = await fetch(routeFile).then((response) => response.text());
  document.querySelector('main').innerHTML = html;
};

window.onpopstate = handleUrl;
window.route = navigate;

handleUrl();
