import routes from '../routes.json';

document.addEventListener('click', (event) => {
  if (!event.target.matches('a')) {
    return;
  }

  navigate(event);
});

const navigate = (eventOrPath) => {
  if (eventOrPath instanceof Event) {
    eventOrPath.preventDefault();
    const href = eventOrPath.target.href;
    window.history.pushState({}, '', href);
  } else if (typeof eventOrPath === 'string') {
    window.history.pushState({}, '', eventOrPath);
  }

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

  // Fetch and insert the HTML content
  const html = await fetch(routeHtml).then((response) => response.text());
  document.querySelector('main').innerHTML = html;

  // Remove any previously loaded scripts
  let scriptId = routeScript.split('/').slice(0, -1).join('-');
  const existingScript = document.querySelector(`#script${scriptId}`);
  if (existingScript) {
    existingScript.remove();
    console.log(`Removed existing script for route: ${scriptId}`);
  }

  // Attempt to load and execute the route's script
  try {
    await loadScript(routeScript, scriptId);
  } catch (error) {
    console.error(`Failed to load script for route: ${path}`, error);
  }
};

const loadScript = async (src, scriptId) => {
  try {
    const response = await fetch(src);
    const scriptContent = await response.text();

    if (scriptContent.startsWith('<!DOCTYPE html>')) {
      return;
    }

    const script = document.createElement('script');
    script.id = `script${scriptId}`; // Use the refined ID
    script.textContent = scriptContent;
    script.type = 'module';
    document.body.appendChild(script);
  } catch (error) {
    console.error(`Failed to load script: ${src}`, error);
  }
};

window.onpopstate = handleUrl;
window.route = navigate;

handleUrl();
