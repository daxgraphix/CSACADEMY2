try {
  var savedTheme = localStorage.getItem('cs_academy_theme');
  var html = document.documentElement;
  html.classList.add('notranslate');
  var theme = savedTheme === 'dark' ? 'dark' : 'light';
  html.classList.toggle('light', theme === 'light');
  html.classList.toggle('dark', theme === 'dark');
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#090909' : '#f7f4ee');
} catch (error) {
  document.documentElement.classList.add('light');
}
