/*
 Navicat Premium Data Transfer

 Source Server         : yth
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : geli

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 10/06/2021 20:54:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('yth', '123');
INSERT INTO `users` VALUES ('ythaaa', '123123');
INSERT INTO `users` VALUES ('ythhhh', 'ythhhh');
INSERT INTO `users` VALUES ('ytha', 'ythyth');
INSERT INTO `users` VALUES ('yth123', 'yth123');
INSERT INTO `users` VALUES ('ythyth1', '123123');

SET FOREIGN_KEY_CHECKS = 1;
