/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function createStudentList (list, page) {
   let studentData = list;
   let pageSize = 9; //possibly set outside, into global scope
   const startIndex = (page*9)-9;
   const endIndex = (page*9);
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";

   for (i = startIndex; i>=startIndex && i<endIndex;i++) {
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

function createPaginationButtons (list) {
   let numberOfButtons = list.length/9;
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = "";

   for (i = 0; i < numberOfButtons; i++) {
      let li = document.createElement('li');
      linkList.appendChild(li);
      
      let button = document.createElement('button');
      button.type = "button";
      button.textContent = `${i+1}`;
      li.appendChild(button);
   }; 

   let firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = "active";
   let allButtons = document.querySelectorAll('button');

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

   return console.log(firstButton.innerHTML);
}

createStudentList(data,1);
createPaginationButtons(data);
