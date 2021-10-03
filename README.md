# accubits-nestjs-test


<h2>Run the Application</h2>
1) install project using <b>npm install</b><br/>
2) copy and rename <b>env.example </b>to <b>.env </b>and add missing details<br/>
3) run the application by <b>npm run start:dev</b><br/>

<br/>
<br/>
<h2>start queue using docker</h2><br/>
<b>docker-compose up </b>
<br/>
<br/>

<h2>Run queue listner for queuing email</h2>
<b>npm run listen</b><br/>

<br/>
<br/>

<h2>Run queue listner for failed email queue (parking-lot-queue)</h2><br/>
<b>npm run listen:parkinglot</b>

<h1>API</h1>
<h3>create user API<br></h3>
localhost:3000/user<br/>

{
    "firstname": "test",
    "lastname": "test",
    "email": "test@gmail.com",
    "age" : 12
}

</br>
<br/>

API for upload newsletter csv upload (bulk_email csv file is already inside the application)<br/>
localhost:3000/queue/newletter-csv<br/>
file: <bulk_email>
