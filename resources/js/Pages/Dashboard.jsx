import AddSemesterTutorial from "./components/AddSemesterTutorial";

function Dashboard(props) {
    return (
        <div className="my-8">
            {!props.hasSemester &&
                <AddSemesterTutorial />
            }
        </div>
    );
}

export default Dashboard;