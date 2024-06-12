import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function NavBar() {
    const [curPageName, setCurPageName] = useState('main')

    function NavBtn(name) {
        return (
            <button className="nav-btn" onClick={() => setCurPageName(name)}>
                {name.toUpperCase()}
            </button>
        )
    }

    return (
        <div className="fixed z-50 flex h-fit w-dvw flex-col items-center justify-center gap-4">
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
                        className="relative mx-12 mb-[-1.3%] mt-[1%] w-[7%]"
                        onClick={() => setCurPageName('main')}
                    >
                        {curPageName === 'main' ? (
                            <Lottie
                                className={'min-w-24'}
                                path={
                                    'lotties/welcomePage/low-nonstop-wheel.json'
                                }
                                loop={true}
                                autoplay={true}
                            />
                        ) : (
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
                        )}
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
            <img src="images/welcomePage/nav-bar-hr.png" width={'67%'} />
        </div>
    )
}
