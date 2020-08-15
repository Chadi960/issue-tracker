document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';
    let issueDeadline = document.getElementById('issueDeadline').value;
    let dateObj = new Date();
    let issueDate =dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();


    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus,
        Deadline: issueDeadline,
        Date: issueDate,
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset();

    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    issues.forEach(issue => {
        if(issue.id == id){
            issue.status = 'Closed';
        }
    });

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    issues.forEach((issue, i) => {
        if(issue.id == id){
            issues.splice(i, 1);
        }
    });
  
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    var htmlStr = "";
  
    issuesList.innerHTML = '';
  
    issues.forEach(issue => {
        let id = issue.id;
        let desc = issue.description;
        let severity = issue.severity;
        let assignedTo = issue.assignedTo;
        let status = issue.status;
        let Deadline = issue.Deadline;
        let Date = issue.Date;
  
      htmlStr +=   `<div class="well">
                                 <h6>Issue ID: ${id}</h6>
                                 <p>`;if(status == "Closed"){htmlStr += `<span class="label label-danger">${status}</span> `}else{htmlStr += `<span class="label label-info"> ${status}</span> `}; 
                                 htmlStr += `<span class="label label-default">Date created: ${Date}</span></p>
                                 <h3>${desc}</h3>
                                 <p><span class="glyphicon glyphicon-time"></span> ${severity}`;
                                 if(assignedTo !== ""){htmlStr += `<span class="glyphicon glyphicon-user"></span> ${assignedTo}`};
                                 if(Deadline !== ""){htmlStr += `<span class="class-deadline"> Due: ${Deadline}</span>`};
                                 htmlStr +=`</p> <a href='#' onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                                 <a href="#"  onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                                 </div>
                                 `;
        issuesList.innerHTML = htmlStr;
    })
}