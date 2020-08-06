document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
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
    issues.forEach(issue =>{
        if (issue.id == id){
            issue.status = 'Closed';
        }
    });
    fetchIssues();
}

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    issues.forEach(issue => {
        let id = issue.id;
        let desc = issue.description;
        let severity = issue.severity;
        let assignedTo = issue.assignedTo;
        let status = issue.status;
    
        issuesList.innerHTML += `<div class="well">
                                 <h6>Issue ID: ${id} </h6>
                                 <p><span class="label label-info"> ${status} </span></p>
                                 <h3>${desc}</h3>
                                 <p><span class="glyphicon glyphicon-time"</span> ${severity}
                                 <span class="glyphicon glyphicon-user"</span> ${assignedTo} </p>
                                 <a href='#' onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                                 <a href="#"  onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                 </div>
                                 `;
    });
}