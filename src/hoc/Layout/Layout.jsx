import React, {useState} from 'react';
import styles from './Layout.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle.jsx';
import Drawer from '../../components/Navigation/Drawer/Drawer.jsx';


function Layout(props) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function toggleMenuHandler() {
        setIsMenuOpened(!isMenuOpened);
    }

    return(
        <div className={styles.Layout}>
            <MenuToggle
                onToggle={toggleMenuHandler}
                isOpen={isMenuOpened}
            />
            <Drawer
                isOpen={isMenuOpened}
                onToggle={toggleMenuHandler}
            />
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;