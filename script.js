const displayContainer = document.querySelector(".display_main");
const layoutBtn = document.querySelector(".layout_btn");
const numberBtn = document.querySelectorAll(".number_btn");
const sortingBtns = document.querySelectorAll(".sort_btn");
const defualSort = document.querySelector("#defualt");
// console.log(sortingBtns)

let defualtDataArray = [];
let filterDataArray = [];
let dateFilterDataArray = [];
// console.log(numberBtn)

async function getData(pageNumber) {
  try {
    const api = await fetch(
      `https://api.freeapi.app/api/v1/public/books?page=${pageNumber}&limit=12`
    );

    const response = await api.json();
    // console.log(response);

    const data = response.data.data;
    // console.log(data);
    data.forEach((element) => {
      //   console.log(element);
      const bookData = element.volumeInfo;
      createCard(bookData);
      defualtDataArray.push(bookData);
      filterDataArray.push(bookData);
      dateFilterDataArray.push(bookData);
      // console.log(bookData)
    });
    addFilterData();
    addDateFilterData();
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
  if (layoutBtn.textContent === "Grid") {
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

layoutBtn.addEventListener("click", () => {
  if (layoutBtn.textContent === "Grid") {
    layoutBtn.textContent = "List";
  } else {
    layoutBtn.textContent = "Grid";
  }
  clearStyles();
});

function clearStyles() {
  // Clearing and reapplying styles based on the new value
  displayContainer.classList.toggle("dis_grid_main");
  displayContainer.classList.toggle("list_grid_main");

  document
    .querySelectorAll(".card_grid_main, .card_list_main")
    .forEach((card) => {
      card.classList.toggle("card_grid_main");
      card.classList.toggle("card_list_main");
    });

  document
    .querySelectorAll(".card_thumbnail_grid, .card_thumbnail_list")
    .forEach((thumb) => {
      thumb.classList.toggle("card_thumbnail_grid");
      thumb.classList.toggle("card_thumbnail_list");
    });

  document
    .querySelectorAll(".card_details_grid_main, .card_details_list_main")
    .forEach((detail) => {
      detail.classList.toggle("card_details_grid_main");
      detail.classList.toggle("card_details_list_main");
    });

  document.querySelectorAll(".book_discription").forEach((desc) => {
    desc.style.display = layoutBtn.textContent === "Grid" ? "none" : "block";
  });
}

numberBtn.forEach((page) => {
  page.addEventListener("click", () => {
    // console.log(page);
    const active = document.querySelectorAll(".active");

    active.forEach((element) => {
      element.classList.remove("active");
    });

    if (layoutBtn.textContent !== "Grid") {
      clearStyles();
      layoutBtn.textContent = "Grid";
    }

    page.classList.add("active");
    displayContainer.innerHTML = "";
    getData(page.textContent);

    clearFilterData();

    defualSort.checked = true;
    // console.log(filterDataArray);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  layoutBtn.textContent = "Grid";
  displayContainer.innerHTML = "";
  getData(1);

  clearFilterData();
  defualSort.checked = true;
  
});

function clearFilterData() {
  filterDataArray.length = 0;
}

function addFilterData() {
  filterDataArray.sort((a, b) => {
    let titleA = (a.title || "").trim().toLowerCase().normalize("NFC");
    let titleB = (b.title || "").trim().toLowerCase().normalize("NFC");

    return titleA.localeCompare(titleB);
  });
}

function addDateFilterData() {
  dateFilterDataArray.sort(
    (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
  );
}

sortingBtns.forEach((btn) => {
  btn.addEventListener("change", () => {
    chngeSortedCards(btn.value);
  });
});

function chngeSortedCards(sortingMethod) {
  console.log(sortingMethod);

  if (sortingMethod === "defualt") {
    if (layoutBtn.textContent !== "Grid") {
      clearStyles();
      layoutBtn.textContent = "Grid";
    }
    displayContainer.innerHTML = "";

    defualtDataArray.forEach((data) => {
      console.log(data);

      createCard(data);
    });
  } else if (sortingMethod === "name") {
    if (layoutBtn.textContent !== "Grid") {
      clearStyles();
      layoutBtn.textContent = "Grid";
    }
    displayContainer.innerHTML = "";

    filterDataArray.forEach((data) => {
      createCard(data);
    });
  } else {
    if (layoutBtn.textContent !== "Grid") {
      clearStyles();
      layoutBtn.textContent = "Grid";
    }
    displayContainer.innerHTML = "";

    dateFilterDataArray.forEach((data) => {
      createCard(data);
    });
  }
}
