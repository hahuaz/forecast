import React from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Input, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function AdressInput({
	setAdress,
	adress,
	fetchForecast,
	loading,
	error,
}) {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					marginBottom: '2rem',
					marginX: 'auto',
					maxWidth: '600px',
				}}
			>
				<Input
					id="standard-basic"
					label="Domain"
					variant="standard"
					placeholder="Provide an adress"
					value={adress}
					onChange={(e) => setAdress(e.target.value)}
					fullWidth
					error={error}
					sx={{
						fontSize: '28px',
						alignItems: 'flex-end',
						'& .MuiInput-input': {
							paddingLeft: '5px',
						},
					}}
				></Input>
				<LoadingButton
					onClick={fetchForecast}
					loading={loading}
					sx={{
						'& .MuiCircularProgress-root': {
							width: '34px !important',
							height: '34px !important',
							color: 'black',
						},
					}}
				>
					<SendIcon
						sx={{
							fontSize: '3rem',
							cursor: 'pointer',
						}}
					/>
				</LoadingButton>
			</Box>
		</>
	);
}
