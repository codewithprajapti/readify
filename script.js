const displayContainer = document.querySelector(".display_main");
const layoutBtn = document.querySelector(".layout_btn");
const layoutBtnTxt = layoutBtn.textContent;
const numberBtn = document.querySelectorAll(".number_btn");
// console.log(numberBtn)

async function getData(pageNumber) {
  try {
    const api = await fetch(
      `https://api.freeapi.app/api/v1/public/books?page=${pageNumber}&limit=10&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech`
    );

    const response = await api.json();
    console.log(response)

    const data = response.data.data;
    console.log(data);

    data.forEach((element) => {
      console.log(element);
      const bookData = element.volumeInfo;
      createCard(bookData);
    });
  } catch (error) {
    // return alert(error);
  }
}

function createCard(book) {
  // Creating Card Container

  const cardMain = document.createElement("a");
  cardMain.setAttribute("href", book.infoLink);
  cardMain.setAttribute("target", "_blank");

  const thumbnailContainer = document.createElement("div");

  const thumbnailImage = document.createElement("img");
  thumbnailImage.setAttribute("src", book.imageLinks.thumbnail);
  thumbnailContainer.appendChild(thumbnailImage);

  const cardDetailContainer = document.createElement("div");

  const titleContainer = document.createElement("h2");
  titleContainer.textContent = book.title;
  const titleIcon = document.createElement("i");
  titleIcon.classList.add("fas", "fa-book");
  titleContainer.prepend(titleIcon);
  cardDetailContainer.appendChild(titleContainer);
  titleContainer.classList.add("book_title");

  const publisherContainer = document.createElement("h3");
  publisherContainer.textContent = book.publisher;
  const publisherIcon = document.createElement("i");
  publisherIcon.classList.add("fas", "fa-building");
  publisherContainer.prepend(publisherIcon);
  cardDetailContainer.appendChild(publisherContainer);
  publisherContainer.classList.add("publisher");

  const authorNames = book.authors;

  authorNames.forEach((author) => {
    const authorContainer = document.createElement("h4");
    authorContainer.textContent = author;

    const authorIcon = document.createElement("i");
    authorIcon.classList.add("fas", "fa-user-edit");
    authorContainer.prepend(authorIcon);

    cardDetailContainer.appendChild(authorContainer);
    authorContainer.classList.add("author");
  });

  const publishDateContainer = document.createElement("h6");
  publishDateContainer.textContent = book.publishedDate;
  const publishDateIcon = document.createElement("i");
  publishDateIcon.classList.add("fas", "fa-calendar-alt");
  publishDateContainer.prepend(publishDateIcon);
  cardDetailContainer.appendChild(publishDateContainer);
  publishDateContainer.classList.add("published_date");

  const bookDiscriptionContainer = document.createElement("p");
  bookDiscriptionContainer.classList.add("book_discription");
  bookDiscriptionContainer.textContent = book.description;
  //   console.log(book.description)

  cardMain.appendChild(thumbnailContainer);
  cardMain.appendChild(cardDetailContainer);
  cardMain.appendChild(bookDiscriptionContainer);
  displayContainer.appendChild(cardMain);

  addClass(
    cardMain,
    thumbnailContainer,
    cardDetailContainer,
    bookDiscriptionContainer
  );
}

function addClass(cardMain, thumbnailContainer, cardDetailContainer) {
  if (layoutBtnTxt === "Grid") {
    displayContainer.classList.add("dis_grid_main");
    cardMain.classList.add("card_grid_main");
    thumbnailContainer.classList.add("card_thumbnail_grid");
    cardDetailContainer.classList.add("card_details_grid_main");
  } else {
    displayContainer.classList.add("list_grid_main");
    cardMain.classList.add("card_list_main");
    thumbnailContainer.classList.add("card_thumbnail_list");
    cardDetailContainer.classList.add("card_details_list_main");
  }
}

// layoutBtn.addEventListener("click", () => {
//   if (layoutBtn.textContent === "Grid") {
//     layoutBtn.textContent = "List";
//   } else {
//     layoutBtn.textContent = "Grid";
//   }
//   clearStyles()
// });

// function clearStyles() {
//   // Clearing and reapplying styles based on the new value
//   displayContainer.classList.toggle("dis_grid_main");
//   displayContainer.classList.toggle("list_grid_main");

//   document
//     .querySelectorAll(".card_grid_main, .card_list_main")
//     .forEach((card) => {
//       card.classList.toggle("card_grid_main");
//       card.classList.toggle("card_list_main");
//     });

//   document
//     .querySelectorAll(".card_thumbnail_grid, .card_thumbnail_list")
//     .forEach((thumb) => {
//       thumb.classList.toggle("card_thumbnail_grid");
//       thumb.classList.toggle("card_thumbnail_list");
//     });

//   document
//     .querySelectorAll(".card_details_grid_main, .card_details_list_main")
//     .forEach((detail) => {
//       detail.classList.toggle("card_details_grid_main");
//       detail.classList.toggle("card_details_list_main");
//     });

//   document.querySelectorAll(".book_discription").forEach((desc) => {
//     desc.style.display = layoutBtn.textContent === "Grid" ? "none" : "block";
//   });
// }

numberBtn.forEach((page) => {
  page.addEventListener("click", () => {
    console.log(page);
    const active = document.querySelectorAll(".active");
    // console.log(active);
    active.forEach((element) => {
      element.classList.remove("active");
    });

    // clearStyles()
    page.classList.add("active");
    displayContainer.innerHTML = "";
    getData(page.textContent);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    
  displayContainer.innerHTML = "";
  getData(1);
});
