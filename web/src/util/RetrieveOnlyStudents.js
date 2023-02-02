export function retrieveOnlyStudents(users) {
    var studentArray = [];
    for (var user of users){
        if (user.userType == "Student"){
            studentArray.push(user);
        }
    }
    return studentArray;
}