export const scrapeQuotes = (document: Document) => {
  const data = [];
  document
    .querySelectorAll('body > div > div:nth-child(2) > div.col-md-8 > div')
    .forEach((element) => {
      const quote = element.querySelector('.text').textContent;
      const author = element.querySelector('.author').textContent;
      const tags = [];
      element.querySelectorAll('.tag').forEach((tag) => {
        tags.push(tag.textContent);
      });
      data.push({
        quote,
        author,
        tags,
      });
    });
  const nextButton: HTMLAnchorElement | null =
    document.querySelector('.next > a');
  const hasNextPage = !!nextButton;
  const nextPageRef = hasNextPage ? nextButton.href : '';
  return {
    data,
    hasNextPage,
    nextPageRef,
  };
};
