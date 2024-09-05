import React from 'react'
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
export default function page() {
    return (
        <Box
            width='100vw'
            height='100vh'
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            flexDirection={'column'}
        >
            <Card maxWidth={400} margin='0 auto' padding={2} >
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            type="email"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            required
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

