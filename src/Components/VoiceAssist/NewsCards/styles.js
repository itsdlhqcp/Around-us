import { makeStyles } from '@material-ui/core/styles';
<style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
</style>
export default makeStyles({
    media: {
        height: 250,
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
    container: {
        padding: '0 5%',
        width: '100%' ,
        margin: 0,
    },
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width:'100%',
        height:'100%',
        padding:'1rem',
        borderRadius: 10,
        color:'white'
    },
    infoCard:{
        display:'flex',
        flexDirection:'column',
        textAlign:'center'
    },
    activeCard: {
        borderBottom: '10px solid #704c70',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      }
});