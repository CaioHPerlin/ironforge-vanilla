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

  const routeFolder = `/pages${path === '/' ? '' : path}/`;

  const routeHtml = `${routeFolder}index.html`;
  const routeScript = `${routeFolder}script.js`;

  const html = await fetch(routeHtml).then((response) => response.text());
  document.querySelector('main').innerHTML = html;

  const script = await fetch(routeScript).then((response) => response.text());

  // For some reason the Fetch API returns the html file when the routeScript is not found
  // This probably happens because the server is configured to return index.html when the file is not found
  if (script.startsWith('<!DOCTYPE html>')) {
    return;
  }

  const scriptElement = document.createElement('script');
  scriptElement.src = routeScript;
  scriptElement.type = 'module';
  document.body.appendChild(scriptElement);
};

window.onpopstate = handleUrl;
window.route = navigate;

handleUrl();
