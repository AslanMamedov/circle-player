import Roundy from 'roundy';
import song from './static/RYX-Lençóis(LoveMe).mp3';
import style from './App.module.scss';
import image from './static/188895211_375417047218815_4597818884271277087_n.jpg';

import { BsFillPlayCircleFill } from 'react-icons/bs';
import { MdPauseCircle, MdSkipNext } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

function App() {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const [valueRange, setValueRange] = useState<number>(0);

	const [currentTime, setCurrentTime] = useState<number>(0);

	const [duractionTime, setDuractionTime] = useState<number>(0);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	//--
	useEffect(() => {
		const duraction: number = !isNaN(Number(audioRef.current?.duration)) ? Number(audioRef.current?.duration) : 0;
		setDuractionTime(duraction);
	}, [audioRef.current?.onloadeddata, audioRef.current?.readyState]);

	//--
	const calculateTime = (secs: number): string => {
		const minutes: number = Math.floor(secs / 60);
		const returnMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const seconds: number = Math.floor(secs % 60);
		const retrunSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${returnMinutes}:${retrunSeconds}`;
	};

	//--

	const animationRef = useRef<number>();

	const whilePlaying = (): void => {
		if (audioRef.current?.currentTime !== audioRef.current?.duration) {
			animationRef.current = requestAnimationFrame(whilePlaying);
			setCurrentTime(Number(audioRef.current?.currentTime));
			setValueRange(Number(audioRef.current?.currentTime) / (Number(audioRef.current?.duration) / 100));
		} else {
			cancelAnimationFrame(Number(animationRef.current));
		}
	};

	//--
	const onChangeRangeValue = (value: any): void => {
		const progress: number = Math.floor((duractionTime / 100) * value);
		audioRef.current!.currentTime = progress;
		setCurrentTime(progress);
	};

	//--

	const onChangePlayBtn: React.MouseEventHandler<HTMLSpanElement> = (): void => {
		setIsPlaying((isPlaying) => !isPlaying);
		if (!isPlaying) {
			audioRef?.current?.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioRef?.current?.pause();
			cancelAnimationFrame(Number(animationRef.current));
		}
	};

	//--

	return (
		<div className={style.app}>
			<audio ref={audioRef} src={song} />
			<div className={style.container}>
				<section className={style.flex}>
					<span className={style?.name}>Let You Down</span>
					<span className={style?.singer}>NF</span>
					<div className={style.player}>
						<div className={style.time}>
							<span>{calculateTime(currentTime)}</span> | <span>{calculateTime(duractionTime)}</span>
						</div>
						<div className={style['range-container']}>
							<img className={style.img} src={image} alt="singer" />
							<div className={style.range}>
								<Roundy
									value={valueRange}
									min={0}
									max={100}
									sliced={false}
									stepSize={1}
									color="orange"
									bgColor="rgba(163, 173, 183, .5)"
									arcSize={300}
									rotationOffset={121}
									onChange={onChangeRangeValue}
									radius={125}
									strokeWidth={3}
									thumbSize={10}
									allowClick
									overrideStyle={
										'.sliderHandle::after {right: -5.2px; width: 14px; height: 14px; cursor: pointer; background: orange; border: none;} .sliderHandle:hover:after {box-shadow: none;} svg { stroke-linecap: round;}'
									}
								/>
							</div>
						</div>
					</div>
					<div className={style.buttons}>
						<MdSkipNext className={style.rotate} />
						<span onClick={onChangePlayBtn} className={style['play-btn']}>
							{!isPlaying ? <BsFillPlayCircleFill /> : <MdPauseCircle />}
						</span>
						<MdSkipNext />
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;

// const [isPlaying, setIsPlaying] = useState<boolean>(false);
// const [audio, setAudio] = useState<IAudio[]>(audioArrPath);
// const [value, setValue] = useState(0);
// const [duraction, setDuraction] = useState<number>(0);
// const [currentTime, setCurrentTime] = useState<number>(0);
// const [max, setMax] = useState(0);

// const audioRef = useRef<HTMLAudioElement | null>(null);
// const animationRef = useRef<number>();

// useEffect(() => {
// 	const seconds: number = Math.floor(Number(audioRef?.current?.duration));
// 	setDuraction(seconds);
// 	setMax(seconds);
// }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]);

// const calculateTime = (secs: number): string => {
// 	const minutes: number = Math.floor(secs / 60);
// 	const returnMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
// 	const seconds: number = Math.floor(secs % 60);
// 	const retrunSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
// 	return `${returnMinutes}:${retrunSeconds}`;
// };

// const onChangePlayBtn: React.MouseEventHandler<HTMLSpanElement> = (): void => {
// 	const prevValue = isPlaying;
// 	setIsPlaying(!prevValue);
// 	if (!prevValue) {
// 		audioRef.current?.play();
// 		animationRef.current = requestAnimationFrame(whilePlaying);
// 	} else {
// 		audioRef.current?.pause();
// 		cancelAnimationFrame(Number(animationRef.current));
// 	}
// };

// const whilePlaying = () => {
// 	setValue(Number(audioRef.current?.currentTime));
// 	changePlayerCurrentTime();
// 	animationRef.current = requestAnimationFrame(whilePlaying);
// };

// const changePlayerCurrentTime = () => {
// 	setValue((value / Number(audioRef.current?.duration)) * 100);
// 	setCurrentTime(value);
// };

// const onChageValue = (value: number) => {
// 	const progress: number = Math.floor((duraction / 100) * value);
// 	setCurrentTime(progress);
// 	audioRef.current!.currentTime = progress;
// setValue(Number(audioRef?.current?.currentTime));
// };
