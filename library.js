// Write your code here!
//Developed by KAUSTAV SAHA (1929018)
document.getElementById("logged-in-user-name").innerHTML = "No user logged in";

let arr = [
    {
        id:"1",
        book:"Book1",
        Author:"Author1",
        Lender:"UserC",
        Borrower:"UserB",
        Actions:"",
    },
    {
        id:"2",
        book:"Book2",
        Author:"Author2",
        Lender:"UserC",
        Borrower:"",
        Actions:"",
    },
    {
        id:"3",
        book:"Book3",
        Author:"Author3",
        Lender:"UserD",
        Borrower:"UserC",
        Actions:"",
    },
    {
        id:"4",
        book:"Book4",
        Author:"Author4",
        Lender:"UserA",
        Borrower:"",
        Actions:"",
    },
    {
        id:"5",
        book:"Book5",
        Author:"Author5",
        Lender:"UserA",
        Borrower:"",
        Actions:"",
    },
    {
        id:"6",
        book:"Book6",
        Author:"Author6",
        Lender:"UserB",
        Borrower:"UserA",
        Actions:"",
    }
]

let count=0;

function changeLoggedInUser(){
    let logIn = document.getElementById("logged-user");
    let userName = logIn.value;
    if(userName === ""){
        alert("LOGIN FAILED !!\n(Username is null)");
    }
    else{
        let obj = arr.find(key => key.Lender === userName);
        if(obj){
            count++;
            document.getElementById("logged-in-user-name").innerHTML = "Logged in user: "+userName;
            addActionButton(userName);
            addBookCol(userName,count);
        }
        else
            alert("LOGIN FAILED !!\n(User doesnt exists)");
    }  
}

function populateTable(){   
    let html = "<thead><tr><th>Id</th><th>Title</th><th>Author</th><th>Lender</th><th>Borrower</th><th>Action</th></tr></thead>";
    
    for(let i=0;i<arr.length;i++){
        html+="<tr>";
        html+="<td>"+arr[i].id+"</td>";
        html+="<td>"+arr[i].book+"</td>";
        html+="<td>"+arr[i].Author+"</td>";
        html+="<td>"+arr[i].Lender+"</td>";
        html+="<td>"+arr[i].Borrower+"</td>";
        html+="<td>"+arr[i].Actions+"</td>";
        html+="</tr>";
        }
        document.getElementById("info-table").innerHTML = html;
}

populateTable();

let table = document.getElementById("info-table");
function addBookCol(name,count){
    if(count!=1) table.deleteRow(arr.length+1);
    var row = table.insertRow(arr.length+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = arr.length+1;
    cell4.innerHTML = name;

    cell2.innerHTML = `<input id=\"bookInput\" type=\"text\"/ placeholder=\"bookname\">`;
    cell3.innerHTML = `<input id=\"authorInput\" type=\"text\"/ placeholder=\"authorname\">`;

    cell6.innerHTML = `<button onclick=\"newBookAdd('${name}','${count}')\" class=\"btn btn-warning\">Add Book</button>`;
}

function newBookAdd(name,count){
    let book = document.getElementById('bookInput').value;
    let author = document.getElementById('authorInput').value;
    
    if(book!="" && author!=""){
        console.log(book);
        var row = table.insertRow(arr.length+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = ++arr.length;
        
        cell2.innerHTML = document.getElementById('bookInput').value;
        cell3.innerHTML = document.getElementById('authorInput').value;
        cell4.innerHTML = name;
        addBookCol(name,arr.length);     
    }
    else{
        alert("Book Name and Author Name cannot be empty !!");
    }
}

function addActionButton(name){
    let table = document.getElementById("info-table");
    for (var i = 1, row; row = table.rows[i]; i++){
        let lender = row.cells[3].innerHTML;
        let borrower = row.cells[4].innerHTML;
        if(lender!=name){
            if(borrower=="") row.cells[5].innerHTML=`<button onclick=\"borrowBook('${i}','${name}')\" class=\"btn btn-success\">Borrow</button>`;
            else if(borrower===name) row.cells[5].innerHTML=`<button onclick=\"returnBook('${i}','${name}')\" class=\"btn btn-danger\">Return</button>`;
            else row.cells[5].innerHTML="";
        }
        else row.cells[5].innerHTML="";
    }
}

function borrowBook(i,name){
    let table = document.getElementById("info-table");
    table.rows[i].cells[4].innerHTML=name;
    table.rows[i].cells[5].innerHTML=`<button onclick=\"returnBook('${i}','${name}')\" class=\"btn btn-danger\">Return</button>`;
}

function returnBook(i,name){
    let table = document.getElementById("info-table");
    table.rows[i].cells[4].innerHTML="";
    table.rows[i].cells[5].innerHTML=`<button onclick=\"borrowBook('${i}','${name}')\" class=\"btn btn-success\">Borrow</button>`;
}

