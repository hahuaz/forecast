import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import './assets/css/App.css';
import ForecastForm from './components/ForecastForm';
import ForecastTable from './components/ForecastTable';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000',
		},
		secondary: {
			main: '#f50057',
		},
	},
	typography: {
		fontFamily: ['Helvetica', 'Arial', 'sans-serif'].join(','),
	},
});

function App() {
	const [adress, setAdress] = useState('istanbul');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const fetchForecast = async () => {
		setLoading(true);
		setData(null);
		try {
			const { data } = await axios.get(
				`https://hahuaz-forecast.herokuapp.com/api/?adress=${adress}`
			);
			setData(data);

			console.log(data);
		} catch (error) {
			console.error(error);
			setError(true);
		}
		setLoading(false);
	};

	return (
		<>
			<AnimatePresence>
				<ThemeProvider theme={theme}>
					<Box
						sx={{
							marginX: 'auto',
							paddingTop: '25px',
							height: 'calc(100vh - 3.5rem)',
							width: {
								xs: 400,
								md: 600,
								lg: 900,
							},
						}}
					>
						<ForecastForm
							adress={adress}
							setAdress={setAdress}
							fetchForecast={fetchForecast}
							loading={loading}
							error={error}
						></ForecastForm>

						{data !== null && loading === false && (
							<motion.div
								key="forecastTable"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 0.9,
									type: 'tween',
								}}
							>
								<ForecastTable data={data}></ForecastTable>
							</motion.div>
						)}
						{data === null && loading === false && (
							<motion.div
								key="textPlaceholder"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 0.9,
									type: 'tween',
								}}
							>
								<Box
									component="p"
									sx={{
										textAlign: 'center',
									}}
								>
									Before you fetch, did you know average global temperature is
									up 0.94°C (1.7°F) since 1880?
								</Box>
							</motion.div>
						)}
					</Box>
					<div
						style={{
							borderTop: '1px solid black',
							fontSize: '1.2rem',
							height: '3.5rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							maxWidth: '400px',
							marginRight: 'auto',
							marginLeft: 'auto',
						}}
					>
						<p>
							developed by
							<span
								style={{
									fontWeight: 'bolder',
									fontSize: '1.7rem',
									letterSpacing: '.1rem',
								}}
							>
								{' '}
								Hahuaz
							</span>
						</p>
					</div>
				</ThemeProvider>
			</AnimatePresence>
		</>
	);
}

export default App;
