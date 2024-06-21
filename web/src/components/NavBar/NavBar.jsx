import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function NavBar() {
    const [curPageName, setCurPageName] = useState('main')

    const navBarState = useSelector((state) => state.navBar)
    const isNavBarDimmed = navBarState.isDimmed

    function NavBtn(name) {
        return (
            <button className="nav-btn" onClick={() => setCurPageName(name)}>
                {name.toUpperCase()}
            </button>
        )
    }

    return (
        <div
            className={`${isNavBarDimmed ? 'z-0' : 'z-50'} max-laptop:scale-75 max-laptop:mt-[-1rem] fixed flex h-fit w-dvw flex-col items-center justify-center gap-4 select-none max-mobile:mt-0`}
        >
            <header className="flex justify-around">
                <div
                    id="nav-bar"
                    className="flex w-fit items-end justify-center"
                >
                    <div className="nav-btn-holder">
                        {curPageName === 'roadmap' ? (
                            NavBtn('roadmap')
                        ) : (
                            <Link to="/roadmap">{NavBtn('roadmap')}</Link>
                        )}
                        {curPageName === 'tokenomics' ? (
                            NavBtn('tokenomics')
                        ) : (
                            <Link to="/tokenomics">{NavBtn('tokenomics')}</Link>
                        )}
                    </div>
                    <div
                        id="wheel-holder"
                        className="relative z-50 mx-12 mb-[-1.3%] mt-[1%] w-[7%] max-mobile:mx-5 max-mobile:ml-2"
                        onClick={() => setCurPageName('main')}
                    >
                        <Link to={'/'}>
                            <Lottie
                                className={'w-[6.5em] max-mobile:w-[3em]'}
                                path={
                                    'lotties/navBar/low-nonstop-wheel.json'
                                }
                                loop={true}
                                autoplay={true}
                            />
                        </Link>
                    </div>
                    <div className="nav-btn-holder">
                        {curPageName === 'garage' ? (
                            NavBtn('garage')
                        ) : (
                            <Link to="/garage">{NavBtn('garage')}</Link>
                        )}
                        {curPageName === 'jukebox' ? (
                            NavBtn('jukebox')
                        ) : (
                            <Link to="/jukebox">{NavBtn('jukebox')}</Link>
                        )}
                    </div>
                </div>
            </header>
            <Lottie
                className={'z-0 w-[69.9%] min-w-24 max-mobile:w-full max-mobile:mt-0'}
                path={'lotties/navBar/nav-bar-hr.json'}
                loop={true}
                autoplay={true}
            />
        </div>
    )
}
