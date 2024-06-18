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
            className={`${isNavBarDimmed ? 'z-0' : 'z-50'} max-laptop:scale-75 max-laptop:mt-[-1rem] fixed flex h-fit w-dvw flex-col items-center justify-center gap-4 select-none`}
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
                        {curPageName === 'tokenomica' ? (
                            NavBtn('tokenomica')
                        ) : (
                            <Link to="/tokenomica">{NavBtn('tokenomica')}</Link>
                        )}
                    </div>
                    <div
                        id="wheel-holder"
                        className="relative z-50 mx-12 mb-[-1.3%] mt-[1%] w-[7%]"
                        onClick={() => setCurPageName('main')}
                    >
                        <Link to={'/'}>
                            <Lottie
                                className={'min-w-24'}
                                path={
                                    'lotties/welcomePage/low-nonstop-wheel.json'
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
                        {curPageName === 'our merch' ? (
                            NavBtn('our merch')
                        ) : (
                            <Link to="/merch">{NavBtn('our merch')}</Link>
                        )}
                    </div>
                </div>
            </header>
            {/*<img src="images/navBar/nav-bar-hr.png" width={'67%'} />*/}
            <Lottie
                className={'z-0 w-[69.9%] min-w-24'}
                path={'lotties/navBar/nav-bar-hr.json'}
                loop={true}
                autoplay={true}
            />
        </div>
    )
}
