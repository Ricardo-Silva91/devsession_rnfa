import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import platform from '../utils/platform'

const IOSTouchable = TouchableOpacity;

const AndroidTouchable = ({ children, style, ...props }) => (
    <TouchableNativeFeedback { ...props }>
        <View style={ style }>
            { children }
        </View>
    </TouchableNativeFeedback>
);

AndroidTouchable.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
    ]).isRequired,
    style: PropTypes.object,
};

export default platform.isIOS ? IOSTouchable : AndroidTouchable;
