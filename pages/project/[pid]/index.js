export default function ProjectTeammates(props) {
  return (
    <h1>Project {props.pid} Teammates List Page</h1>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {// will be passed to the page component as props
      pid: context.params.pid
    }, 
  }
}