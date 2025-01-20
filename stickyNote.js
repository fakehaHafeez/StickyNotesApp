







// let menuIcon = document.querySelector('#menu-icon');
// let navbar = document.querySelector('.navbar');

// menuIcon.onclick = () => {
//     menuIcon.classList.toggle('fa-xmark');
//     navbar.classList.toggle('active');

// }


// let sections = document.querySelectorAll('section');
// let navLinks = document.querySelectorAll('header nav a');

// window.onscroll = () => {

// let header = document.querySelector('header');

//     header.classList.toggle('sticky', window.scrollY > 100);

//     menuIcon.classList.remove('fa-xmark');
//     navbar.classList.remove('active');


// }




document.addEventListener('DOMContentLoaded', function() {
    const inp = document.querySelectorAll("input")[0];

    var searchData = document.getElementById('search');
    // var searchBtn= document.getElementById('searchBtn');

    const box = document.createElement('div');
    document.body.appendChild(box);
    box.className = 'container';

    const addBtn = document.querySelector('#add');

    function addImageBox(student,i)  {
        const imageBox = document.createElement('div');
        imageBox.className = 'main';

        const bar = document.createElement('div');
        bar.className = 'head';

        const image = document.createElement('img');
        image.className = 'img1';
        image.src ='img2.jpg';
        imageBox.appendChild(image);
        imageBox.appendChild(bar);

        const notes = document.createElement('div');
        notes.className = 'notes';
        notes.innerText = 'Sticky Notes...';
        imageBox.appendChild(notes);

        const digitalClock = document.createElement('div');
        digitalClock.className = 'clock';
        imageBox.appendChild(digitalClock);

        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        imageBox.appendChild(dateDiv);




        const display = () => {
                var date = new Date();
                var hour = date.getHours();
                var min = date.getMinutes();
                var sec = date.getSeconds();
            
            
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var monthIndex = date.getMonth();
                var monthName = monthNames[monthIndex];
                var dd = date.getDate();
                var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var dayIndex = date.getDay();
                var dayName = dayNames[dayIndex];
            
            
            
            
            
                
                if (hour > 12) {
                    hour -= 12;
                }
                
            
            
                if(hour < 10){
                    hour='0' + hour;
                }
                if(min < 10){
                    min='0' + min;
                }
                if(sec < 10){
                    sec='0' + sec;
                }
               
            
                digitalClock.innerText=`${hour}  :   ${min}   :   ${sec} `;
            
                dateDiv.innerText=`${dayName} / ${dd} /  ${monthName}  `;
               
            
                
                
                
            }
            setInterval(display , 1000);




        const message = document.createElement("div");
        message.className = "input";
        message.innerHTML = `=> ${student.txt}`;
        imageBox.appendChild(message);

        const del = document.createElement('button');
        del.className = 'fa fa-trash-can del-btn';
        imageBox.appendChild(del);

        box.appendChild(imageBox);

        del.addEventListener('click', function() {
            imageBox.remove();
            const notes = JSON.parse(localStorage.getItem('students'));
            const index = notes.indexOf(student);
            notes.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(notes));
        });





        const edit = document.createElement('button');
        edit.className = 'fa-regular fa-pen-to-square edit-btn';
        imageBox.appendChild(edit);

        edit.addEventListener('click', function() {
               
            var editInp=document.createElement('input');
            editInp.placeholder='Edit Text';
            editInp.className='editInp';
            imageBox.appendChild(editInp);

             editInp.value= `${student.txt}`;



            var saveBtn=document.createElement('button');
            saveBtn.className='save';
            saveBtn.innerText='Save';
            imageBox.appendChild(saveBtn);


            


            saveBtn.addEventListener('click', function() {
                var updateData = editInp.value;
                student.txt = updateData;
 
                let students = JSON.parse(localStorage.getItem('students')) || [];
                students[i] = student;
                localStorage.setItem('students', JSON.stringify(students));
                message.innerHTML = ` => ${student.txt}`;
  
    
                editInp.value='';

            });


        });







    };

    

    addBtn.addEventListener('click', function () {
 
        let student={txt: inp.value }
    
       
    if (localStorage.getItem('students')) {
        const data = JSON.parse(localStorage.getItem('students')) || [];
       
        localStorage.setItem('students', JSON.stringify([...data,student]));
    } else {
      
        localStorage.setItem('students', JSON.stringify([ student]));
    }
        addImageBox(student);
        inp.value = ''; 
    });

    

    function loadData() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach((item, i) => addImageBox(item, i));
    };
    loadData();


    searchData.addEventListener('change', function() {
        const displayData = searchData.value.toLowerCase();
        const students = JSON.parse(localStorage.getItem('students')) || [];
        box.innerHTML = ''; 
        students.forEach(student => {
            if (student.txt.toLowerCase().includes(displayData)) {
        addImageBox(student);
                
            }
          
        });
        
        searchData.value =''; 
    });



   


   


});



