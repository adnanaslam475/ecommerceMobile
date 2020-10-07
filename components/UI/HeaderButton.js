import * as React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons';

 const customHeaderButton = (props) => {
    return (
        <HeaderButton {...props}IconComponent={Ionicons}  iconSize={32} color='white' />
    );
}
export default customHeaderButton
