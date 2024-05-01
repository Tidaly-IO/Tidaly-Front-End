import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import home from '../assets/home.png';
import accountSetup from "../assets/accountSetup.png";
import capteur from "../assets/capteurs.png";
import consoGlobaleCapteurs  from "../assets/conso_globale_des_capteurs.png";
import profile from "../assets/profile.png";
import repartitionConsoCapteurs from "../assets/répartition_de_la_conso_des_capteurs.png";
import stats from "../assets/stats.png";
import waterMeter from "../assets/waterMeter.png";
import waterMeterSetup from "../assets/waterMeterSetup.png";


//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const AutoPlaySwipeableViews = SwipeableViews;


const images = [
    {
        label: 'Après avoir suivi ce tutoriel, vous serez dirigé vers cette page pour renseigner vos informations personnelles.',
        imgPath: accountSetup,
    },
    {
        label: 'Une fois vos informations renseignées, vous devrez entrer l\'identifiant de votre hub. Si celui-ci est déjà enregistré, vous serez redirigé vers la page d\'accueil sinon, vous accéderez à la configuration de votre hub.',
        imgPath: waterMeter,
    },
    {
        label: 'Ici, vous pouvez configurer votre hub en saisissant votre consommation actuelle, votre objectif de consommation, votre ville et votre code postal, pour obtenir le prix de l\'eau correspondant à votre région.',
        imgPath: waterMeterSetup,
    },
    {
        label: 'La page d\'accueil affiche votre consommation d\'eau en temps réel pour la journée en cours, ainsi que la consommation de la semaine actuelle et des semaines précédentes du mois.',
        imgPath: home,
    },
    {
        label: 'La page de profil vous permet de consulter et modifier vos informations personnelles, de changer votre mot de passe, de supprimer votre compte, et d\'accéder au tutoriel si nécessaire.',
        imgPath: profile,
    },
    {
        label: 'Sur la page des statistiques, vous pouvez visualiser votre historique de consommation d\'eau sur la journée, la semaine, le mois et l\'année en cours, ainsi que sur toutes les périodes précédentes disposant d\'un historique. Vous y trouverez également un résumé de votre consommation et de vos économies réalisées.',
        imgPath: stats,
    },
    {
        label: 'Sur la page "Mes capteurs", ajoutez votre compteur d\'eau si vous avez omis cette étape lors de votre connexion. Vous pouvez également ajouter un nouveau capteur par point d\'eau, ainsi que modifier ou supprimer un capteur existant.',
        imgPath: capteur,
    },
    {
        label: 'Sur la page de consommation globale des capteurs, vous pourrez consultez votre consommation d\'eau par rapport à votre consommation globale et par capteurs. Vous pourrez également consulter les dernieres cativitées de vos capteurs par point d\'eau.',
        imgPath: consoGlobaleCapteurs,
    },
    {
        label: 'Sur la page de répartiton de la consommation des capteurs, vous pourrez consulter la repartition de votre consommation d\'eau par rapport à vos capteurs par point d\'eau. Vous pourrez également consulter les dernieres cativitées de vos capteurs par point d\'eau.',
        imgPath: repartitionConsoCapteurs,
    },
];


function Caroussel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 900, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 500,
                                    display: 'block',
                                    maxWidth: 900,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                variant="progress"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 900, flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default Caroussel;

