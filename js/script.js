/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//pageSize determines how many students display on each page
let pageSize = 9;


//createStudentList() generates a number of list items using the student information stored in data.js.
//The number of list items generated depends on both the pageSize and the number of students in data[]
// @param list -- the array of student data, here stored in data.js file
// @param page -- which group of students should be displayed e.g. on page 2, students 10-18 should appear

function createStudentList (list, page) {
   let studentData = list;
   const startIndex = (page*pageSize)-pageSize;
   const endIndex = (page*pageSize);
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";
   
   //This for loop dynamically generates the student list items
   for (i = startIndex; i>=startIndex && i<endIndex;i++) {
      //This if statement ensures that list items are only generated when student data exists.
      //Prevents function for attempting to fill the pageSize when the number of students does not allow for the full pageSize
      if (data[i]) {
         let li = document.createElement('li');
         li.className = 'student-item cf';
         studentList.appendChild(li);

         let studentDiv = document.createElement('div');
         studentDiv.className = 'student-details';
         li.appendChild(studentDiv);

         let studentImage = document.createElement('img');
         studentImage.className = 'avatar';
         let pictureURL = studentData[i].picture.medium;
         studentImage.src = pictureURL;
         studentDiv.appendChild(studentImage);

         let studentName = document.createElement('h3');
         studentName.textContent = `${studentData[i].name.first} ${studentData[i].name.last}`;
         studentDiv.appendChild(studentName);

         let studentEmail = document.createElement('span');
         studentEmail.className = 'email';
         studentEmail.textContent = `${studentData[i].email}`;
         studentDiv.appendChild(studentEmail);

         let joinedDiv = document.createElement('div');
         joinedDiv.className = 'joined-details';
         li.appendChild(joinedDiv);

         let joinedDate = document.createElement('span');
         joinedDate.className = 'date';
         joinedDate.textContent = `Joined ${studentData[i].registered.date}`;
         joinedDiv.appendChild(joinedDate);
      };  
   };
}

//createPaginationButtons() determines how many pagination buttons are required as per the amount of student data available and dynammically creates them
// @param list -- the array of student data

function createPaginationButtons (list) {
   let numberOfButtons = list.length/pageSize;
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = "";
   
   //dynamically creates the number of pagination buttons required per # of students and pageSize
   for (i = 0; i < numberOfButtons; i++) {
      let li = document.createElement('li');
      linkList.appendChild(li);
      
      let button = document.createElement('button');
      button.type = "button";
      button.textContent = `${i+1}`;
      li.appendChild(button);
   }; 

   //This allows the first page to be displayed when the page first loads
   let firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = "active";
   let allButtons = document.querySelectorAll('button');

   //This event listener waits for a pagination button to be clicked and then calls createStudentList to change which students appear on the page
   linkList.addEventListener('click', (e) => {
      if (e.target.type === "button") {
         for (let i = 0; i < numberOfButtons; i++) {
            allButtons[i].className = "";
            e.target.className = "active";
            let page = e.target.textContent;
            createStudentList(list,page);
         };
      };
   });
}

function createSearchBar () {
   const h2 = document.querySelector('h2');
 
   const searchBarHTML = `<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

   h2.insertAdjacentHTML('afterend',searchBarHTML);
}

function performSearch(searchInput, studentInfo) {
   // const charactersEntered = searchInput.length;
   const searchTerm = searchInput.toLowerCase();
   let searchResults = [];

   for (let i=0;i<studentInfo.length; i++) {
      const firstName = studentInfo[i].name.first;
      const lastName = studentInfo[i].name.last;
      const fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
   
      if (searchInput.length !== 0 && fullName.includes(searchTerm)) {
         searchResults.push(studentInfo[i]);
      };
   };

   createStudentList(searchResults,1);
   createPaginationButtons(searchResults);
}

//Calls the functions to display the first set of students when the page first loads
createStudentList(data,1);
createPaginationButtons(data);
createSearchBar();

//Set up eventListener for search bar
const searchBox = document.getElementById("search");

searchBox.addEventListener('keyup', ()=> {
   console.log('heeeeeya');

});