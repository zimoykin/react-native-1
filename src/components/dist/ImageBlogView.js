"use strict";
exports.__esModule = true;
exports.ImageViewBlog = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var NetworkManager_1 = require("../_service/NetworkManager");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var react_router_native_1 = require("react-router-native");
var LinkButton_1 = require("./../Model/LinkButton");
exports.ImageViewBlog = function (props) {
    var _a = react_1.useState(props.blog.image), image = _a[0], seImage = _a[1];
    var _b = react_1.useState(), images = _b[0], setImages = _b[1];
    react_1.useEffect(function () {
        async_storage_1["default"].getItem('accessToken').then(function (val) {
            if (val != null) {
                var http = new NetworkManager_1.Http(val);
                var pageQuery = {};
                pageQuery["blogid"] = props.blog.id;
                http.get('api/blogs/images/list', pageQuery).then(function (values) {
                    setImages(values);
                });
            }
        });
    }, [image]);
    var changeImage = function () {
        if (images != undefined) {
            var current = images.indexOf(image);
            current += 1;
            if (current >= images.length) {
                current = 0;
            }
            seImage(images[current]);
        }
    };
    var ImagePreview = function (item, key) {
        return (react_1["default"].createElement(react_native_1.View, { key: key },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return seImage(item); } },
                react_1["default"].createElement(react_native_1.Image, { style: styles.previewImage, source: { uri: item } }))));
    };
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return changeImage(); } },
                react_1["default"].createElement(react_native_1.Image, { style: styles.image, source: { uri: image } })),
            react_1["default"].createElement(react_router_native_1.Link, { style: styles.location, to: "/location", component: LinkButton_1.ButtonText, text: props.blog.title })),
        props.isFull ? (react_1["default"].createElement(react_native_1.ScrollView, { horizontal: true }, images === null || images === void 0 ? void 0 : images.map(ImagePreview))) : null));
};
var styles = react_native_1.StyleSheet.create({
    image: {
        width: react_native_1.Dimensions.get("screen").width,
        height: react_native_1.Dimensions.get("screen").width
    },
    previewImage: {
        width: react_native_1.Dimensions.get("screen").width / 4,
        height: react_native_1.Dimensions.get("screen").width / 4
    },
    location: {
        position: 'absolute',
        zIndex: 999,
        padding: 5,
        top: 0,
        color: 'white'
    }
});
