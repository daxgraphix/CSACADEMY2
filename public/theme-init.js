try {
  var savedTheme = localStorage.getItem('cs_academy_theme');
  var html = document.documentElement;
  html.classList.add('notranslate');
  var theme = savedTheme === 'dark' ? 'dark' : 'light';
  html.classList.toggle('light', theme === 'light');
  html.classList.toggle('dark', theme === 'dark');
  var surface = theme === 'dark' ? '#090909' : '#ffffff';
  html.style.backgroundColor = surface;
  if (document.body) document.body.style.backgroundColor = surface;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#090909' : '#ffffff');
} catch (error) {
  document.documentElement.classList.add('light');
  document.documentElement.style.backgroundColor = '#ffffff';
  if (document.body) document.body.style.backgroundColor = '#ffffff';
}
