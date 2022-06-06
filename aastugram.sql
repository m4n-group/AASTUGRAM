-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220605.3bb0712d47
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 11:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aastugram`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `sender` varchar(50) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `sentAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`sender`, `question`, `sentAt`) VALUES
('estifmitiku@gmail.com', 'Not so well', '2022-06-06 19:53:11');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(255) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `role` varchar(100) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `name`, `email`, `role`, `passwd`, `created_on`) VALUES
(5, 'Minase Fikadu', 'minase@gmail.com', 'Admin', '81dc9bdb52d04dc20036dbd8313ed055', '2022-06-29 00:42:04'),
(6, 'Michael Gashaw', 'mikeegashaw@gmail.com', 'admin', '81dc9bdb52d04dc20036dbd8313ed055', '2022-06-29 00:42:20'),
(7, 'Mohammed Yezid', 'mame11@yahoo.com', 'Admin', '81dc9bdb52d04dc20036dbd8313ed055', '2022-07-05 15:27:24'),
(8, 'Nathan Lijalem', 'nathlij@gmail.com', 'Admin', '81dc9bdb52d04dc20036dbd8313ed055', '2022-07-05 15:27:44'),
(9, 'Minase Driba', 'minasedr@yahoo.com', 'Admin', '81dc9bdb52d04dc20036dbd8313ed055', '2022-07-05 15:28:03'),
(10, 'Software Department', 'SWEG@aastu.edu.et', 'Authorized Organization', '81dc9bdb52d04dc20036dbd8313ed055', '2022-07-05 15:28:03'),
(11, 'Mechanical Department', 'MEEG@aastu.edu.et', 'Authorized Organization', 'f5bb0c8de146c67b44babbf4e6584cc0', '0000-00-00 00:00:00'),
(12, 'Electrical Department', 'EEG@aastu.edu.et', 'Authorized Organization', '81dc9bdb52d04dc20036dbd8313ed055', '0000-00-00 00:00:00'),
(13, 'ElectroMechanical Department', 'EMEEg@aastu.edu.et', 'Authorized Organization', '827ccb0eea8a706c4c34a16891f84e7b', '2022-05-27 08:53:50'),
(19, 'Civil Department', 'CEG@aastu.edu.et', 'Authorized Organization', '6af2462065474ec7892340e39339eb38', '2022-05-27 09:12:14'),
(20, 'Architecture Department', 'AEG@aatu.edu.et', 'Authorized Organization', 'd6194c68fcc7e79bb57401be603cb1cc', '2022-05-27 09:14:32'),
(24, 'Lewi Daniel ', 'lewi28@gmail.com', 'Admin', '53a7d1b524a68eeb1fb4c589b5fc4522', '2022-05-27 11:36:46'),
(25, 'minase1047', 'minasesotlg@gmail.com', 'Admin', 'f5bb0c8de146c67b44babbf4e6584cc0', '2022-06-06 10:50:02'),
(26, 'Software Department', 'SWEG@aastu.edu.et', 'Admin', '0d5c3561e7343e02085315430d4683a2', '2022-06-06 16:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `sender` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `postedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL,
  `groupid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `repno` int(11) NOT NULL,
  `ReportedGroup` varchar(255) DEFAULT NULL,
  `Report` varchar(255) DEFAULT NULL,
  `Reporter` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`repno`, `ReportedGroup`, `Report`, `Reporter`, `date`) VALUES
(1, 'DemoGroups', 'Fake Account', 'estifmitiku@gmail.com', '2022-06-06 19:31:14');

-- --------------------------------------------------------

--
-- Table structure for table `sgroups`
--

CREATE TABLE `sgroups` (
  `id` int(11) NOT NULL,
  `gname` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `admin` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `photo` varchar(200) NOT NULL DEFAULT 'automatic.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sgroups`
--

INSERT INTO `sgroups` (`id`, `gname`, `category`, `description`, `admin`, `createdAt`, `photo`) VALUES
(1, 'dd', 'academic', 'dd', 'estifmitiku@gmail.com', '2022-06-06 19:31:41', ''),
(2, 'dddfaa', 'academic', 'dd', 'estifmitiku@gmail.com', '2022-06-06 19:32:06', ''),
(3, 'for', 'academic', 'real', 'estifmitiku@gmail.com', '2022-06-06 19:34:31', ''),
(4, 'estif', 'artsAndLiterature', ';kladfsjlkjdfs', 'estifmitiku@gmail.com', '2022-06-06 19:35:10', ''),
(5, 'd', 'academic', 'f', 'estifmitiku@gmail.com', '2022-06-06 19:35:34', ''),
(6, 'da;k', 'academic', 'fda', 'estifmitiku@gmail.com', '2022-06-06 19:36:27', ''),
(7, 'mike', 'academic', 'hello', 'estifmitiku@gmail.com', '2022-06-06 20:36:32', '');

-- --------------------------------------------------------

--
-- Table structure for table `sgroup_members`
--

CREATE TABLE `sgroup_members` (
  `user` varchar(50) NOT NULL,
  `sgroup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `sex` char(4) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'automatic.png',
  `img` blob DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `verifcode` varchar(255) DEFAULT NULL,
  `status` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`fname`, `lname`, `sex`, `email`, `phone`, `passwd`, `image`, `img`, `createdAt`, `verifcode`, `status`) VALUES
('Beka', 'Bekhuma', 'male', 'bekab@gmail.com', 965656565, '$2y$10$F276YQTAB8laYPk/4o9pGuWePBN/8PKNqYTdV/mMjboCS1jzBiNKm', 'automatic.png', NULL, '2022-06-06 18:03:56', '1812c6f06d38837307a5efe0561ccc99', 0),
('Beka', 'Bekhuma', 'male', 'bekabs@gmail.com', 965656565, '$2y$10$N7rRUbZZNM/tTz7ZKHMfeeZEq2zIc3NNT6O1B.6Z7ltVLDWm1zPFi', 'Beka629e419f6cd8b9.19249215.png', NULL, '2022-06-06 18:04:15', '953ee0451dfc641845cec12c7acd3071', 1),
('Jelese', 'alayer', 'fema', 'burn@gmail.com', 987458789, '$2y$10$KZNmH9kAa9NRmiI/3X79zOIpZddU1H7K7rKLAMbFmU5qJR/SgXydO', 'giant629ce59062bd87.70223080.png', NULL, '2022-06-05 17:19:12', '4f86d286437c2fa2ac16626d327375f7', 1),
('uma', 'therman', 'male', 'elvispgresley@gmail.com', 980458789, '$2y$10$gFhvcqWhcSRS91Jdi3e9kOd4PLha6ZgDBZX6UIXogQKQoJQENCGIG', 'automatic.png', NULL, '2022-06-05 12:33:53', '943dfc621f9abdccb26f38a2b45d3a6c', 1),
('Energizer', 'surge', 'male', 'energysurge@gmail.com', 987458789, '$2y$10$6JtSZyzlK5EM4i7u017.ZOdG7RSGlpHz7OukPZF/F67fCgwKWVnOC', 'automatic.png', NULL, '2022-06-05 19:36:07', '56b088daaac1e181a0010910c1ab5033', 1),
('Estifanos', 'Mitiku', 'male', 'estifmitiku@gmail.com', 5897978, '$2y$10$CMrvfmBtEDgnU9TNKI8A9uBwk279eyONRuBM5XA1cvvnQ7PwlOIt2', 'Estifanos629deabc148089.23788369.png', NULL, '2022-06-06 11:53:32', '9600c99a9b9cc15fafc7d5dcf356ff0b', 1),
('Etagegne', 'jelese', 'fema', 'etaguachieve@gmail.com', 987458789, '$2y$10$KsmOFeqk0qV7uDEsO5nTCubPeRt83Alfh7b5R8c1y0D2rLlsXL7S6', 'automatic.png', NULL, '2022-06-05 17:18:22', '39a7c696a9ace7aa8bc020cfc4cbf817', 0),
('king', 'fereje', 'male', 'froienti@aastu.edu.et', 987587412, '$2y$10$VEQshJ77bLe42Q3K7fcjyuZZnHQzOx2r1X6mgfpqwjYfur0MsJq..', 'Pastoni629bb8b8de2117.16867230.jpg', NULL, NULL, '1ac774e966a22ef6ff85613115791bf6', 1),
('sezege', 'kid', 'fema', 'haitian@gmail.com', 987458789, '$2y$10$iYvr267SSiq3cvdvGTI7XuAef.rFpUYJ9w1JLzAT8LaWEVV9Mc2oi', 'skater629cd0ba9738c1.87044498.png', NULL, '2022-06-05 15:50:18', '71be1945a05c5ec03c428bf59b292db0', 1),
('death', 'bewitcher', 'male', 'killkillkill@gmail.com', 987458789, '$2y$10$1Qa9v9zfypfInVr8CjpHrOaZ9YKhR.MMg3Gh3vIOqLrWvFXJJ.Snq', 'automatic.png', NULL, '2022-06-05 15:18:17', '27fe2d14ac649511017419853f3c02ad', 1),
('Kirubel', 'Kassahun', 'fema', 'kirak@gmail.com', 965321478, '$2y$10$UM72b0Latz0XSrjDZ8Lc3.zSlgk1xaNDx/IOZKTj0EKeICqyIFwBW', 'automatic.png', NULL, '2022-06-06 18:02:32', '167631faeb9eac2f868d79a1dd5f5d02', 1),
('seru', 'rev', 'male', 'life@gmail.com', 987458789, '$2y$10$6np1N7Ye6KvKw1jNYXPP/egZnl7fxrT3fcVnuMBOsFTxN7IRtYafC', 'automatic.png', NULL, '2022-06-05 20:49:37', 'dcef83a312f624d2e6d90a84e859dce5', 1),
('fremnatos', 'mazigna', 'male', 'magazine@gmail.com', 980458789, '$2y$10$iEP3enCXrD3DLY1s6MdKh.M1IZLy1ndMo8wsOMstHZya/ALITpq.q', 'automatic.png', NULL, NULL, '0fa065be8bc9824f1db7ed920472cc90', 1),
('milo', 'bro', 'male', 'nhy@gmail.com', 987458789, '$2y$10$CUw2KHwZo0Eg2E6.i8cmYe/XfZjL7eavqiFA8yEQ1pL6iDB7ezpyO', 'automatic.png', NULL, '2022-06-05 13:55:23', '890000b44722544296cbeac525252c30', 1),
('salmon', 'harder', 'male', 'rudiger@gmail.com', 987458789, '$2y$10$mVgPet1GcvSEYj3u7VYY5Ob3bIGvW2w5JFb0nvtsjmDhHsnDWVuyq', 'Thinker629bb9f84c4923.56768120.png', NULL, NULL, 'd8faa40518cfb3d90148f4494cd0a419', 1),
('tron', 'legacy', 'male', 'tronlegacy@gmail.com', 987587412, '$2y$10$ZOVPmD/xYncezRqthMojJerlTYs/MZmO27wkTDk5xmjxU0XfZtZeO', 'tron629cc98d7e3109.02889878.png', NULL, '2022-06-05 15:19:41', 'b55001132da3a71f866b1c2c90ad5a4f', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`sender`,`sentAt`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`sender`,`groupid`),
  ADD KEY `groupid` (`groupid`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`repno`,`Reporter`),
  ADD KEY `Reporter` (`Reporter`);

--
-- Indexes for table `sgroups`
--
ALTER TABLE `sgroups`
  ADD PRIMARY KEY (`id`,`admin`),
  ADD KEY `admin` (`admin`);

--
-- Indexes for table `sgroup_members`
--
ALTER TABLE `sgroup_members`
  ADD PRIMARY KEY (`user`,`sgroup`),
  ADD KEY `sgroup` (`sgroup`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `repno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sgroups`
--
ALTER TABLE `sgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`email`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `sgroups` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`Reporter`) REFERENCES `users` (`email`);

--
-- Constraints for table `sgroups`
--
ALTER TABLE `sgroups`
  ADD CONSTRAINT `sgroups_ibfk_1` FOREIGN KEY (`admin`) REFERENCES `users` (`email`);

--
-- Constraints for table `sgroup_members`
--
ALTER TABLE `sgroup_members`
  ADD CONSTRAINT `sgroup_members_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `sgroup_members_ibfk_2` FOREIGN KEY (`sgroup`) REFERENCES `sgroups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



