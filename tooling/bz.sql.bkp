-- Adminer 4.8.1 MySQL 5.5.5-10.7.3-MariaDB-1:10.7.3+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE bz;

USE bz;

DROP TABLE IF EXISTS `commendations`;
CREATE TABLE `commendations` (
  `id` varchar(36) NOT NULL,
  `date_sent` varchar(27) NOT NULL DEFAULT '0000-00-00 00:00:00',
  `from_user` varchar(36) NOT NULL,
  `to_user` varchar(36) NOT NULL,
  `message` varchar(1000) NOT NULL,
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;


DROP TABLE IF EXISTS `emailList`;
CREATE TABLE `emailList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `emailList_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

INSERT INTO `emailList` (`id`, `team_id`, `email`) VALUES
(1,	1,	'faulknr@cedarville.edu'),
(2,	1,	'burnsb@cedarville.edu'),
(3,	1,	'annahurt@cedarville.edu'),
(4,	1,	'klutz@cedarville.edu'),
(5,	1,	'vwormack@cedarville.edu'),
(6,	2,	'burnsb@cedarville.edu'),
(7,	2,	'miriamcook@cedarville.edu'),
(8,	2,	'parkerjohnson@cedarville.edu'),
(9,	2,	'cryan@cedarville.edu'),
(10,	2,	'awestenberger@cedarville.edu'),
(11,	2,	'isaacshaw@cedarville.edu'),
(12,	3,	'dmacdougall@cedarville.edu'),
(13,	3,	'burnsb@cedarville.edu'),
(14,	3,	'rufusmathew@cedarville.edu'),
(15,	3,	'kaseypot@cedarville.edu'),
(16,	4,	'dmacdougall@cedarville.edu'),
(17,	4,	'burnsb@cedarville.edu'),
(18,	4,	'rufusmathew@cedarville.edu'),
(19,	4,	'kaseypot@cedarville.edu'),
(20,	5,	'burnsb@cedarville.edu'),
(21,	5,	'jacoblindaberry@cedarville.edu'),
(22,	5,	'habel@cedarville.edu'),
(23,	5,	'averymariehopkins@cedarville.edu'),
(24,	6,	'burnsb@cedarville.edu'),
(25,	6,	'alecmathisen@cedarville.edu'),
(26,	7,	'burnsb@cedarville.edu'),
(27,	8,	'tkabel@cedarville.edu'),
(28,	8,	'burnsb@cedarville.edu'),
(29,	9,	'burnsb@cedarville.edu'),
(30,	9,	'madisonrosenbalm@cedarville.edu'),
(31,	9,	'jmagnuson@cedarville.edu'),
(32,	9,	'haleythompson@cedarville.edu'),
(33,	10,	'lmkuhn@cedarville.edu'),
(34,	10,	'burnsb@cedarville.edu'),
(35,	10,	'pgammie@cedarville.edu'),
(36,	10,	'ekelly@cedarville.edu'),
(37,	10,	'bmullikin@cedarville.edu'),
(38,	10,	'bwhitehead@cedarville.edu'),
(39,	11,	'burnsb@cedarville.edu');

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) NOT NULL,
  `role` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;


DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `logo` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

INSERT INTO `team` (`id`, `name`, `logo`) VALUES
(1,	'Information Group',	'https://drive.google.com/uc?export=view&id=1Z6g7r7Agy2iwVGyxs5jfmWACzw8NfkXt'),
(2,	'Rinnova',	'https://drive.google.com/uc?export=view&id=1sFLQWj59AwHEinqvebw-nfgW_tCDOox-'),
(3,	'SGA',	'https://drive.google.com/uc?export=view&id=1zbdwCnTyiyTnXSY_Q59jOHaoA8mlB2Sd'),
(4,	'Class Council',	'https://drive.google.com/uc?export=view&id=1AmSsRTFmjI44N2EviX68j_HGlDZJYpjU'),
(5,	'CAB',	'https://drive.google.com/uc?export=view&id=1D3LPnhVsEZUu3qfxm7Q7KDP4Jzv_Wyfl'),
(6,	'CSG',	'https://drive.google.com/uc?export=view&id=1xeWajjcVbi0MEceBTkG2X0tVsn6MsOaj'),
(7,	'BZ Navigator',	'https://drive.google.com/uc?export=view&id=1t3SCH6DhTLQHkMOk4U2zEpMbTLwy4NJF'),
(8,	'Finance',	'https://drive.google.com/uc?export=view&id=1SKvgHevTXMRxoyI2K-foaHBot99Ur6yQ'),
(9,	'Marketing',	'https://drive.google.com/uc?export=view&id=1sU-lbkwPlYjZSDwYoP1FNebcs6JJd6kz'),
(10,	'OPS',	'https://drive.google.com/uc?export=view&id=1rcy7LbM2Jf79YB1F-NGMlPx8X95u_ild'),
(11,	'Full Time',	'https://drive.google.com/uc?export=view&id=1MkQLFjQLBR-wYBk9KRBzvy-5eVlOhWUG');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(150) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `team` int(11) NOT NULL,
  `phone` varchar(150) DEFAULT NULL,
  `googleId` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team` (`team`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

INSERT INTO `users` (`id`, `email`, `name`, `team`, `phone`, `googleId`) VALUES
('03ea9ed1-00f1-46ae-9df2-988d1a4d594a',	'matthewpettus@cedarville.edu',	'Matthew Pettus',	3,	'(859) 516-8021',	'116986729459359421507'),
('0541ac70-2482-4c7a-9b39-f59a8bf997e9',	'victoriaskaggs@cedarville.edu',	'Victoria Skaggs',	4,	NULL,	'115998721471754079442'),
('05d11203-3f97-4cb6-a475-aab38b221e89',	'jbiddinger@cedarville.edu',	'Julia Biddinger',	2,	'(937) 352-5497',	'100728406556360490478'),
('06279b2b-84fc-44b0-a35e-280cb630b788',	'edwardgaudet@cedarville.edu',	'Edward (Teddy) Gaudet',	10,	'(508) 871-6659',	'104913972062986391275'),
('08ecb031-2876-4111-add7-c111ae432ded',	'kjschweibold@cedarville.edu',	'Kimmie Schweibold',	2,	NULL,	'112412448347773657408'),
('0949008d-8b25-49bf-9c52-d2338bec4045',	'emilyzichi@cedarville.edu',	'Emily Zichi',	2,	'(440) 320-6247',	'109165768897893675149'),
('0a68d3c1-887d-4c47-b35f-ea5bd714282b',	'darbyfehl@cedarville.edu',	'Darby Fehl',	4,	'(317) 737-5027',	'116027709218634153676'),
('0c58bd87-c9d7-4733-84cf-126441db5c6b',	'jmagnuson@cedarville.edu',	'Jason Magnuson',	9,	'(301) 466-9751',	'101175841033779268369'),
('0e2d93a5-0ee9-4d27-bae2-be60936c3ad8',	'ocombs@cedarville.edu',	'Olivia Combs',	1,	'(937) 999-9699',	'101664098014067578494'),
('117d3979-6f85-4346-800e-084b3aa05741',	'averymariehopkins@cedarville.edu',	'Avery Hopkins',	5,	'(251) 776-4535',	'105584795161528856605'),
('1303b2de-c941-4530-a949-643a9e86f532',	'jacksonisenhower@cedarville.edu',	'Jackson Isenhower',	6,	'(513) 485-7110',	'102647355445972070413'),
('1487c7c6-8090-4e81-98f3-de01b909f3c4',	'nvarotti@cedarville.edu',	'Nicholas Varotti',	2,	NULL,	'104795722817985209368'),
('14e6dbea-d731-4db9-898d-ffed2a16208b',	'jlybarger@cedarville.edu',	'Jeff Lybarger',	4,	'(603) 313-9515',	'117209465652743722826'),
('1e9161a5-4fe0-41b9-8021-4340dc50fdf1',	'vwormack@cedarville.edu',	'Vanessa Wormack',	1,	'(719) 459-5777',	'114159060180341239025'),
('2122fd43-2f83-44c8-8501-11557e7811e1',	'rpater@cedarville.edu',	'Rhyan Pater',	1,	NULL,	'101227753925356983839'),
('218927fd-be3c-439a-aa34-0489f35c5e49',	'glorybrooks@cedarville.edu',	'Glory Brooks',	1,	'(509) 885-4757',	'107445130608216415621'),
('2586d9d1-a4f4-4907-9194-45ed3f3f0753',	'micahmayse@cedarville.edu',	'Micah Mayse',	10,	'(515) 201-4300',	'107259795292888785404'),
('2748b1cf-a3d6-45e0-8e3c-327051ec574d',	'isaacshaw@cedarville.edu',	'Isaac Shaw',	2,	'(937) 919-4991',	'107664642848936671784'),
('29011740-0587-426a-a6ff-fc37435e60f7',	'ggagarinas@cedarville.edu',	'Gaby Gagarinas',	5,	'(585) 230-4679',	'111897667121888641835'),
('2972e12d-04ec-46cc-97d7-eae0fd8456b9',	'kluke@cedarville.edu',	'Kaleb Luke',	10,	'(308) 627-8192',	'105249737933730068596'),
('2a7815be-f9e1-4756-8981-7223c9107234',	'nstikeleather@cedarville.edu',	'Nathan Stikeleather',	4,	'(919) 633-2976',	'105743065085365543862'),
('2dadfaed-e09b-41e9-be09-e17d2a37b3c0',	'isaacalbright@cedarville.edu',	'Isaac Albright',	5,	'(260) 255-2390',	'105905756509681997463'),
('309ede83-b153-4ef2-b869-20970b8e6738',	'hannahyost@cedarville.edu',	'Hannah Yost',	2,	'(419) 889-2017',	'107521010413012050235'),
('31edaf00-7527-4077-b518-2784de1e86e5',	'williamhess@cedarville.edu',	'Will Hess',	10,	'(937) 231-6916',	'100084198955104312871'),
('32bf8ac1-65eb-434c-883f-cc7379b7ec4e',	'cassadyholdeman@cedarville.edu',	'Cassady Holdeman',	1,	'(989) 600-2540',	'102033718837657723555'),
('3499b0ce-8eec-43d6-80ef-857851d742da',	'dwoodall@cedarville.edu',	'Derek Woodall',	2,	'(585) 507-7283',	'105385709971595046689'),
('3a9aaceb-489b-4663-ac28-b06087089660',	'haleythompson@cedarville.edu',	'Haley Thompson',	9,	'(843) 409-2502',	'113735347556833838278'),
('3ae1368e-7741-453b-9e44-441a3c7e7de8',	'marysofia@cedarville.edu',	'Amailia Sofia',	3,	'(610) 999-5639',	'111394359711394226059'),
('3ae7c08e-c1f3-45a5-aeea-15b9300f3cbb',	'bmullikin@cedarville.edu',	'Ben Mullikan',	10,	'(307) 214-2366',	'115614352640104527941'),
('3ba9320a-417a-4439-87dd-fd870a0a4560',	'dmacdougall@cedarville.edu',	'Dan MacDougall',	11,	NULL,	'109671180562200381350'),
('3e4596e0-5f0e-4b85-a14a-d15a7cff37b4',	'faulknr@cedarville.edu',	'Chrissy Faulkner',	11,	NULL,	'116039395987536913215'),
('3e485267-6b76-4e6c-9f40-9bfda1f7552f',	'amygue@cedarville.edu',	'Amy Gue',	5,	'(502) 888-9691',	'103037249348234470829'),
('3f74f172-3774-4c12-93e1-f67cdff51a4f',	'caleighsullivan@cedarville.edu',	'Caleigh Sullivan',	4,	'(419) 271-5243',	'112416103010977580327'),
('3f906971-fee9-4cd4-999d-b8155c388b58',	'sshowers@cedarville.edu',	'Sage Showers',	2,	'(918) 697-2882',	'112990032329281652618'),
('401172e4-1b96-4086-aec9-a9dc6200d311',	'jschlatmann@cedarville.edu',	'Justin Schlatmann',	4,	'(609) 879-1306',	'102715683090963041410'),
('401828cb-7035-413e-8775-3a1659638d43',	'jethomas@cedarville.edu',	'Jessie Thomas',	5,	'(330) 921-1702',	'109088304290326194989'),
('42ad7639-3b5c-4449-a21c-86526081b8bd',	'hkuczynski@cedarville.edu',	'Hannah Kuczynski',	5,	'(586) 292-3356',	'103187406158248371550'),
('42d24f65-7dc5-4ec8-9f5f-b9e538eb79b9',	'ahines@cedarville.edu',	'Amanda Hines',	5,	'(586) 531-7527',	'101249918266833077504'),
('42e4ee52-173a-4fb8-8217-871e574733b9',	'kaseypot@cedarville.edu',	'Kasey Pot',	3,	'(513) 340-0072',	'111011201236479019992'),
('44c6dc47-fd03-4791-8c40-30a53a4da4dd',	'asepanski@cedarville.edu',	'Allie Sepanski',	2,	'(563) 381-4650',	'112326017234239007003'),
('48658d64-f6c3-4026-9b5e-353a59a32f0b',	'tglasstetter@cedarville.edu',	'Teddy Glasstetter',	2,	'(302) 419-7014',	'109223531826015026768'),
('4991b4a9-3a10-4af7-8c35-29d3b16b091f',	'cmidkiff@cedarville.edu',	'Carson (Chase) Midkiff',	10,	'(937) 823-3990',	'114467262388494683734'),
('4e499e47-452a-489e-9e10-0ea5041f2cb2',	'ekelly@cedarville.edu',	'Ethan Kelly',	10,	'(815) 593-5459',	'101306969351545445222'),
('4f1c17d7-1a24-4529-9798-dc011dd196c2',	'awestenberger@cedarville.edu',	'Lexi Westenberger',	2,	'(262) 402-776',	'107357498478951290910'),
('5166b1ef-deed-4079-adfe-329c8eabe1b4',	'oaronsohn@cedarville.edu',	'Liv Aronsohn',	8,	'(724) 841-1985',	'117862439731189335534'),
('52d7f999-7dbb-457e-abc5-b085c166360a',	'wdaghfal@cedarville.edu',	'Wilson Daghfal',	10,	'(630) 854-8408',	'102340002062571080470'),
('54b9dfba-51c2-4110-9da5-348539adcb01',	'blebs@cedarville.edu',	'Brianna Lebs',	3,	'(734) 802-8224',	'107344659906731370974'),
('57e45fb1-f6c5-4e9e-b562-41c067b32573',	'coreystechschulte@cedarville.edu',	'Corey Stechschulte',	2,	'(740) 816-1030',	'107060008791374016703'),
('585b1632-08fc-461b-a5cc-9ea1bef26aba',	'jacoblindaberry@cedarville.edu',	'Jacob Lindaberry',	5,	'(609) 304-9678',	'102505402242102214568'),
('5a950744-f316-4b39-bc53-bd733a6ce8cf',	'madisonrosenbalm@cedarville.edu',	'Madison Rosenbalm',	9,	'(513) 892-9068',	'116237708801704362914'),
('5d7f0d98-a74c-41bf-bfd2-d056517a9073',	'iestepp@cedarville.edu',	'Isaiah Estepp',	4,	NULL,	'104310707397569159160'),
('5ec2094c-59cb-4523-a1cc-5f5bf7220db5',	'annahurt@cedarville.edu',	'Anna Hurt',	1,	'(614) 512-3156',	'101996026378653755905'),
('60779ea6-7c2b-42fe-981d-0c5a8d5deea0',	'mcastillo@cedarville.edu',	'Mario Castillo',	3,	'(571) 619-5079',	'100467926886293707835'),
('64e086ea-085d-4e01-a4c7-72f05f46a867',	'acervera@cedarville.edu',	'Alana Cervera',	2,	'(630) 346-2911',	'102276136770616909179'),
('65e2b8a8-84df-4045-9536-e367e91fc378',	'devans123@cedarville.edu',	'Daniel Evans',	8,	'(330) 978-6658',	'108788020286433421150'),
('6ecdecaa-3f1e-4984-8e1b-21bb0f1b775d',	'macybowen@cedarville.edu',	'Macy Bowen',	7,	'(937) 532-4857',	'114659723210588557839'),
('7168eaf8-a947-4590-9676-4f132527ac92',	'burnsb@cedarville.edu',	'Brian Burns',	11,	'(937) 903-7810',	'101989297150978906572'),
('7418aaef-4721-4c1c-9016-bc2652810b31',	'gcherry@cedarville.edu',	'Gabe Cherry',	4,	'(609) 775-1388',	'112462039246191284494'),
('7710dde5-3899-4c3c-b146-bc4ca4c17c86',	'nataleelane@cedarville.edu',	'Natalee Lane',	5,	'(515) 444-7510',	'113060681755152254667'),
('7905539d-17ea-4c8e-bb3a-46184b95e6e9',	'elleighperkins@cedarville.edu',	'Elleigh Perkins',	1,	'(614) 937-1402',	NULL),
('7afe825c-f923-43e5-85b9-85c3f6da98fe',	'cryan@cedarville.edu',	'Cally Ryan',	2,	'(952) 258-9350',	'117544544337468523588'),
('7b6b390a-580c-482d-ab70-6c75da26a714',	'jesseoliver@cedarville.edu',	'Jesse Oliver',	7,	'(810) 247-6534',	'114214576928699462720'),
('7ca8ba7f-861d-401e-b483-16a01a71b294',	'lainibergthold@cedarville.edu',	'Laini Bergthold',	2,	NULL,	'112159133626484153608'),
('7f08bceb-9aae-48f1-abba-140653bfc754',	'joshuapene@cedarville.edu',	'Josh Pene',	9,	'(303) 818-7498',	'115499612495170321899'),
('7fc4e3dd-5547-421b-a969-3d41020813b1',	'jennawallenbeck@cedarville.edu',	'Jenna Lyn Wallenbeck',	1,	'(989) 941-1201',	'113561274206170553976'),
('81c87cc1-9c9b-4280-87a4-17579869bc20',	'lkimball@cedarville.edu',	'Lucas Kimball',	10,	'(636) 466-0873',	'104248923915019069713'),
('8272aa05-2d72-4a3a-8077-8a5eb305d52f',	'rileyhowell@cedarville.edu',	'Riley Howell',	5,	'(615) 753-1101',	'106801098809082969602'),
('84499220-b2b0-4802-8188-3f14adea09d9',	'cgroth@cedarville.edu',	'Caroline Roth',	1,	'(740) 348-9318',	'114461105839312329609'),
('86579bd6-af95-4608-acb0-2a9d51e300ea',	'jonnygartner@cedarville.edu',	'Jonny Gartner',	6,	'(740) 881-4827',	'109519666452145459255'),
('87ccb83c-bdca-4ab9-a753-c83682d8da37',	'rickyknapp@cedarville.edu',	'Ricky Knapp',	10,	'(717) 449-1975',	'113340194272134575577'),
('87d09a69-298a-4259-8cc4-e74a7798c89a',	'mpierce@cedarville.edu',	'Megan Pierce',	2,	'(614) 815-2442',	'113767873841817829844'),
('8878b6fe-8a78-43dd-b65b-ec3bf840a216',	'awinter@cedarville.edu',	'Anna Winter',	5,	'(937) 760-5465',	'109838162018751242793'),
('88e39f7a-16ea-468d-a04a-788fccbe5daa',	'lmkuhn@cedarville.edu',	'Loren Kuhn',	11,	NULL,	'115841072822826194997'),
('8db4b5c9-8a9b-4f05-80da-88267150299b',	'pgammie@cedarville.edu',	'Philip Gammie',	10,	'(937) 269-9327',	'108527799402718760754'),
('8e72e81d-5b44-4955-aea9-5d4c47482f77',	'jbrethauer@cedarville.edu',	'Jacob Brethauer',	9,	'(443) 487-3662',	NULL),
('90f960e8-b5c5-475d-9671-03761832e841',	'mariasmith278@cedarville.edu',	'Maria Smith',	1,	'(610) 442-6180',	'109294387587315826937'),
('9178f481-b523-45da-88f9-e3734201024d',	'kaugustine@cedarville.edu',	'Kezia Augustine',	4,	'(937) 838-5433',	'109856374831323500695'),
('929cc253-832c-445a-abcd-85aa7c108b7c',	'lukebear@cedarville.edu',	'Luke Bear',	2,	NULL,	'104472516861889619941'),
('92b4326e-4d3f-4d8b-a323-2a527ca1c55b',	'alecmathisen@cedarville.edu',	'Alec Mathisen',	6,	'(815) 572-0738',	'108769034111152107575'),
('9508adfb-322d-4e52-9ebe-80b3c524deb4',	'emmasheehan@cedarville.edu',	'Emma Sheehan',	2,	'(585) 953-5341',	'110839192372782722290'),
('95c56e06-a2f9-4d80-b24e-e8c24471c52e',	'nseagraves@cedarville.edu',	'Nicole Seagraves',	3,	'(937) 369-5447',	'105521751088176522260'),
('974366d5-8775-40ec-8921-3920c950b3b5',	'bradleyallinson@cedarville.edu',	'Bradley Allinson',	10,	'(267) 342-1231',	'102204701878914385074'),
('996066a0-3e32-445e-8838-60eed201475f',	'askurdal@cedarville.edu',	'Alayna Skurdal',	2,	'(443) 866 0932',	'112800006914303600579'),
('9aceea4e-f087-4b1d-ad11-ff7595da395e',	'jcolburn@cedarville.edu',	'Janessa Colburn',	3,	'(509) 774-9729',	'104994069767296392788'),
('9b4ac668-71a3-4e9b-bab9-7ca97ef24e51',	'jasonthornhill@cedarville.edu',	'Jason Thornhill',	4,	'(803) 262-9375',	'100915755567349578432'),
('9e167ab4-9c96-412a-af18-7123b69c8073',	'bwhitehead@cedarville.edu',	'Braden Whitehead',	10,	'(317) 995-0862',	'110698018665320565119'),
('a256b7a8-3ede-486f-a1c7-ac31c3402f40',	'slomelin@cedarville.edu',	'Sammie Lomelin',	9,	'(937) 903-5900',	'103525389436036345646'),
('a30d7ead-a52e-40da-a08b-c3cbe3eea438',	'lhoover@cedarville.edu',	'Luke Hoover',	4,	'(513) 535-8504',	'102300489725828944338'),
('a3ec97b7-41e2-4605-9bbf-8e542f99a9b6',	'llutz@cedarville.edu',	'Lauren Lutz',	5,	'(317) 864-1003',	'105576305342945185214'),
('a5da5b02-2c7f-4494-becc-29ef38f3631c',	'tkabel@cedarville.edu',	'Tim Abel',	11,	NULL,	'101650305285928939469'),
('ad0abe01-5783-4016-896c-16ca9f282d1f',	'elliebain@cedarville.edu',	'Ellie Bain',	1,	'(908) 967-0461',	'111878861809321218448'),
('ada06030-8c70-46e7-871f-3685fa3128ba',	'jstafford@cedarville.edu',	'Jason Stafford',	10,	'(515) 971-3570',	'114516995523247846693'),
('ae650fee-050b-4eca-9411-32129abf8f7e',	'eliseanderson@cedarville.edu',	'Elise Anderson',	9,	'(815) 298-5038',	NULL),
('aff3003a-ec51-4842-8d31-14511e6356a1',	'jessiegerakinis@cedarville.edu',	'Jessie Gerakinis',	9,	'(616) 635-6009',	'106561804519234005077'),
('b06a2fde-b130-4aae-bcb8-085f9e190721',	'rscheidegger@cedarville.edu',	'Beka Scheidegger',	9,	'(804) 815-8339',	'108355380073099537415'),
('b38db090-46d0-4e41-8f28-0761ab6426d8',	'malenajackson@cedarville.edu',	'Malena Jackson',	1,	'(267) 222-0477',	'104130436557384683421'),
('b51c5180-57d1-4a75-9b43-6bdf2f738b3f',	'gracezadnik@cedarville.ed',	'Grace Zadnik',	4,	'(540) 686-6468',	'109214346594003109449'),
('b5c6a57d-254e-4fde-af99-5e438d0b1bb6',	'justinschlabach@cedarville.edu',	'Justin Schlabach',	3,	'(330) 641-2000',	'114739833759577639237'),
('bedc089c-528b-471c-be53-3015cad06e6f',	'tlong@cedarville.edu',	'Theresa Long',	11,	NULL,	'117572250346242574933'),
('c4ebdbec-f581-420e-be51-3b5ceed5693c',	'williambrethauer@cedarville.edu',	'Will Brethauer',	9,	'(443) 547-7514',	NULL),
('c73e3b1a-89d4-4179-984e-e0b63fdb1c68',	'awilliams105@cedarville.edu',	'Alexis Williams',	4,	NULL,	'112193392509780986892'),
('c9275fb9-b01d-432f-b772-72a563f3d8e2',	'notto@cedarville.edu',	'Nikolas Otto',	2,	'(740) 501-5205',	'104587296500001518455'),
('cce632b3-13fa-40cc-b451-1c77770e04e0',	'klutz@cedarville.edu',	'Kara Lutz',	1,	'(317) 864-1002',	'108127432393664180567'),
('d38af419-c5c5-4ae2-817a-ed5a2bb36e90',	'abigailwimmer@cedarville.edu',	'Abigail Wimmer',	1,	'(207) 231-4400',	'106043741830568106667'),
('d4743acf-4c07-48ad-8d95-cebfc35bd009',	'ipessoa@cedarville.edu',	'Ian Pessoa',	2,	'(937) 825-3067',	'100765205343553523074'),
('d860e62d-2c7c-48f5-a876-a1d92c21a4c5',	'tseals@cedarville.edu',	'Taylor Seals',	5,	'(224) 388-3257',	'105061368620097628664'),
('d8721e00-b7e6-4352-802e-7bc8b63627ae',	'kathrynlafferty@cedarville.edu',	'Kathryn Lafferty',	2,	'(715) 897-3374',	'110681525686785855509'),
('d8a514d9-e99a-425f-a31d-2877ee5f0e2f',	'sarahcolgan@cedarville.edu',	'Sarah Colgan',	3,	'(703) 853-7009',	'105374389235200329282'),
('db530b5d-2ea3-435b-8016-9daab210c5be',	'browell@cedarville.edu',	'Ben Rowell',	5,	'(708) 657-0727',	'114559741176948561385'),
('dc4e550c-f43c-4972-8096-641abd8bdb3c',	'oharris@cedarville.edu',	'Olivia Harris',	1,	'(507) 564-2041',	'106550126395556198054'),
('dccc56fb-b65b-430a-8435-22584122b71a',	'owennolt@cedarville.edu',	'Owen Nolt',	5,	'(513) 464-0611',	'108869028706439342497'),
('e09a5fc8-b7a7-496f-a894-a375405bb214',	'miriamcook@cedarville.edu',	'Miriam Cook',	2,	'(330) 221-5300',	'116628073048691792655'),
('e54132f8-c660-47de-af1c-262611d39d91',	'aidangraef@cedarville.edu',	'Aidan T. Graef',	6,	'(616) 881-3518',	'102295310629182264868'),
('e63a5a7d-be80-4697-9de7-666e78026e2e',	'ebeeler@cedarville.edu',	'Elle Beeler',	2,	'(563) 549-4977',	'113670868178020014295'),
('e66aaf12-f321-4eeb-8948-80e3331035f9',	'abigailesbenshade@cedarville.edu',	'Abby Esbenshade',	2,	'(740) 918-9511',	'102226870502069184132'),
('ec0c9410-7739-422a-a74b-80bb2dcf67c1',	'carissajohnson@cedarville.edu',	'Carissa Johnson',	2,	NULL,	'101180591391128259126'),
('ed5ea9fe-3969-4e67-b53f-cdc78fe6fa29',	'bethanywormack@cedarville.edu',	'Bethany Wormack',	1,	'(719) 464-1453',	'103342872686008275542'),
('ef2b69b3-171e-49d1-8fd0-b16d86f16544',	'lindseyfark@cedarville.edu',	'Lindsey Fark',	1,	'(419) 619-7179',	'100918327003230139553'),
('f0706101-50c9-4482-a471-529b90107e72',	'rufusmathew@cedarville.edu',	'Rufus Mathew',	3,	'(937) 789-4486',	'109533168859255008986'),
('f0c3048d-b1fb-4043-ad72-d7afc68843fc',	'sbills@cedarville.edu',	'Spencer Bills',	6,	'(304) 551-1045',	'109523807354992536072'),
('f1e1a4bd-7f0d-4980-9ad2-1d0c83f9a8b0',	'ianharrington@cedarville.edu',	'Ian Harrington',	4,	'(267) 201-0670',	'115211228805338217859'),
('f59ddfa9-c46d-4377-a197-7da2fa7efe28',	'nishantnedungadi@cedarville.edu',	'Nishant Nedungadi',	10,	'(240) 397-4912',	'106799800307081611002'),
('f7408829-0b9a-414e-aff6-6129c2007945',	'jmailloux@cedarville.edu',	'Jenna Mailloux',	5,	'(937) 532-4299',	'112313590868096121546'),
('f74d3fa9-b8c0-4054-9801-34974726d7cd',	'parkerjohnson@cedarville.edu',	'Parker Johnson',	2,	'(719) 424-9483',	'104542454230485381321'),
('f84f1e92-55a6-4a41-9e88-ff43be64dfb4',	'csadowski@cedarville.edu',	'Carly Sadowski',	1,	'(512) 461-5142',	'114010389020091818783'),
('fb15ca14-024e-4068-89fe-5fe2534e4838',	'habel@cedarville.edu',	'Hannah Abel',	5,	'(937) 271-3593',	'105586033816882630658'),
('ff8d1c2f-90e8-4a99-9943-addc8a8658b3',	'kgarber@cedarville.edu',	'Katelynn Garber',	1,	'(937) 638-2362',	'110519766026555807473');

DELIMITER ;;

CREATE TRIGGER `users_bi` BEFORE INSERT ON `users` FOR EACH ROW
IF new.id IS NULL THEN
    SET new.id = uuid();
END IF;;

DELIMITER ;

-- 2022-03-16 23:22:20
