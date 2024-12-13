export const openUrl = (url : any) => {
  let a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.click();
};