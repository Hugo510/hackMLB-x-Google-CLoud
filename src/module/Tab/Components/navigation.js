import {useEffect, useRef} from 'react'
import {StyleSheet, Animated, TouchableOpacity,} from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const TabNavigator= ({item, accessibilityState, onPress}) => {
    const animatedValues = {
        translate: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0)).current,
        size: useRef(new Animated.Value(0)).current,
    }

    const {translate, scale, size} = animatedValues

    useEffect(() => {
        handleAnimated()
    }, [accessibilityState.selected])

    const handleAnimated = () => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start()
    }

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                    extrapolate: 'clamp'
                })
            }
        ]
    }


    const scaleStyles = {
        opacity: scale.interpolate({
            inputRange: [.5, 1],
            outputRange: [.5, 1],
            extrapolate: 'clamp'
        }),
        transform: [
            {
                scale: scale
            }
        ]
    }

    const buttonStyles = [
        styles.button,
        accessibilityState.selected && styles.buttonActive,
    ];

    return(
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
             <Animated.View style={[buttonStyles, translateStyles]}>
                <Animated.View style={[{width: 100, height: 100, borderRadius: 100, position: 'absolute', backgroundColor: '#003087', borderColor: '#003087'}, scaleStyles]}/>
                <Material name={item.icon} color={accessibilityState.selected ? '#fff' : '#fff'} size={accessibilityState.selected ? '45':'30'}/>
            </Animated.View>
            <Animated.Text style={[styles.title, {opacity: scale}]}>{item.title}</Animated.Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        alignSelf: 'stretch'
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 100,
        // borderWidth: 1,
        // borderColor: '#fffF',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    buttonActive: {
        backgroundColor: '#FFF',
        borderWidth: 3,
        borderColor: '#003087',
    },
    title: {
        fontSize: 11,
        fontWeight: 'heavy',
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        bottom: 3,
    }
})

export {TabNavigator};