import React from 'react'

import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-3'>
                        <span>Bill Hefty<br />&copy; 2017</span>
                    </div>
                    <div className='col-xs-9'>
                        <ul className='list-inline'>
                            <li>
                                <a href='https://github.com/bhefty' target='_blank'>
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8"/></svg>
                                </a>
                            </li>
                            <li>
                                <a href='https://twitter.com/billhefty' target='_blank'>
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.linkedin.com/in/bill-hefty-6b973689/' target='_blank'>
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a href='mailto:billhefty@gmail.com'>
                                    <svg viewBox="0 0 20 20"><path d="M19.291,3.026c0.002-0.15-0.053-0.301-0.167-0.415c-0.122-0.122-0.286-0.172-0.444-0.161H1.196c-0.16-0.011-0.322,0.039-0.444,0.161C0.637,2.725,0.583,2.875,0.585,3.026c0,0.003-0.002,0.006-0.002,0.009v14.032c0,0.322,0.262,0.584,0.585,0.584h17.54c0.322,0,0.584-0.262,0.584-0.584V3.035C19.292,3.032,19.291,3.029,19.291,3.026zM17.147,3.619l-7.21,6.251L2.728,3.619H17.147z M18.122,15.896c0,0.323-0.261,0.584-0.584,0.584H2.337c-0.323,0-0.585-0.261-0.585-0.584V4.292l7.732,6.704c0.013,0.017,0.019,0.035,0.034,0.052c0.115,0.114,0.268,0.169,0.419,0.166c0.151,0.003,0.304-0.052,0.419-0.166c0.015-0.017,0.021-0.035,0.034-0.052l7.731-6.704V15.896z"></path></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer