
import { Avatar, Box, Container, createTheme, CssBaseline, IconButton, Input, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { Logout, Person, Send } from '@mui/icons-material'
import React, { useCallback, useEffect, useState } from 'react'
import "./index.css"
import  io  from "socket.io-client";
import { useParams } from 'react-router-dom';

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    // padding:"0px !important" 
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontSize: 16,

                }
            }
        }
    }
});




const Room = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [NewMessage, setNewMessage] = useState("")
  const {email} = useParams();
//   console.log('====================================');
//   console.log({email});
//   console.log('====================================');

  useEffect(() => {
   const newSocket = io(`https://shielded-fjord-08478.herokuapp.com/`);
    setSocket(newSocket);
    newSocket.emit("join",{name:email, room:"test"},(error="")=>console.log(error))
    return () => newSocket.close();
  }, [setSocket]);


  const sendMesage=()=>{
    socket.emit("sendMessage", NewMessage, (error)=>{
        console.log({error});
    })
  }

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.push(message);
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket?.on('message', messageListener);
    socket?.on('deleteMessage', deleteMessageListener);
    socket?.emit('getMessages');

    return () => {
      socket?.off('message', messageListener);
      socket?.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);
  console.log('====================================');
  console.log({messages});
  console.log('====================================');
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="100vw" sx={{
                height: "80vh",
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        // flexDirection: 'column',
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: "space-between",

                        bgcolor: "secondary.main"
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        // flexDirection: 'column',
                        width: "100%",
                        height: 50,
                        alignItems: 'center',

                    }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <Person />

                        </Avatar>
                        <Paper elevation={1} >
                            <Typography variant='h3' component={"h4"} className={"person-name"}>
                                Jeetesh
                            </Typography>
                        </Paper>
                    </Box>
                    <Paper elevation={1} sx={{
                        marginRight: 1
                    }}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <Logout />
                        </IconButton>
                    </Paper>
                </Box>
                <Container component={"div"} sx={{
                    bgcolor: 'whitesmoke',
                    height: "100%",
                    width:"100%",
                    display: "flex",
                    flexDirection: "column"
                }} >
                    <Box sx={{

                        flex: 1
                    }}>
                        {messages.map((item, index)=>(
                            <Paper elevation={1} key={index+"akdljdal"}  style={{margin:8}}>
                            <Box sx={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"flex-start"
                            }}>
                            <Typography variant='h3' component={"h4"} className={"person-chat"} color={"primary"} >
                                {item.user}
                            </Typography>
                            :
                            <Typography variant='h3' component={"h4"} className={"person-chat2"}>
                            {item.text}
                            </Typography>
                            </Box>

                        </Paper>
                        ))}
                    </Box>
                    <Box sx={{
                        height: 50,
                        display: "flex",

                        // bgcolor:"secondary.main"
                    }}>
                        <Paper elevation={1} sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            padding:"0px 8px",

                        }}

                        >
                            <Input id={"message"} fullWidth label="fullWidth" placeholder='Message' onChange={(e)=> setNewMessage(e.target.value)} />

                        </Paper>
                        <Paper elevation={1} sx={{
                            
                            // flex: 0.,
                            display: "flex",
                            alignItems: "center",

                        }}>
                            <IconButton onClick={sendMesage} color="secondary" aria-label="send message" component="label" >
                                <Send />
                            </IconButton>
                        </Paper>
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>
    )
}

export default Room