--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: avatars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avatars (
    photo_id integer NOT NULL,
    user_id integer,
    avatar character varying(255) NOT NULL
);


ALTER TABLE public.avatars OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    post_id integer,
    user_id integer,
    text character varying(200),
    date_commented timestamp without time zone NOT NULL,
    date_comment_edited timestamp without time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.comments ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    members text[],
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- Name: conversations_conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.conversations ALTER COLUMN conversation_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.conversations_conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer,
    sender integer NOT NULL,
    text text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.messages ALTER COLUMN message_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: pictures_picture_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.avatars ALTER COLUMN photo_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pictures_picture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    user_id integer,
    post_description character varying(200),
    pictures text[],
    date_posted timestamp with time zone NOT NULL,
    date_edited timestamp with time zone,
    available boolean NOT NULL,
    tree_id integer
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: trees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trees (
    tree_id integer NOT NULL,
    name character varying(50) NOT NULL,
    family character varying(50),
    tree_description character varying,
    scientific_name character varying(50),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.trees OWNER TO postgres;

--
-- Name: trees_tree_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.trees ALTER COLUMN tree_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.trees_tree_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    gender character varying(50) NOT NULL,
    address character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: avatars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avatars (photo_id, user_id, avatar) FROM stdin;
55	3	1669106311448--Adopt a tree Icon.png
57	5	1669193575345--Killjoy_fanart.png
77	37	1676473594718--512x512bb.jpg
53	2	1676480387178--49.jpg
58	16	1669814879848--Killjoy_fanart.png
56	4	1670519693120--Neon_sleeping.jpg
63	17	1672888812201--tree-planting.jpg
67	32	1672892826313--young-planter.jpg
66	1	1673247978533--20.jpg
69	33	1673255329360--49.jpg
68	27	1673269853762--beluga.jpg
\.


--
-- Data for Name: backup_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.backup_table (post_id, user_id, post_description, pictures, date_posted, date_edited, available, tree_id) FROM stdin;
75	16	I would like to plant trees and who's willing to help me.	{1671523485047--3-birch-trees.jpg}	2022-12-20 16:04:45.064716+08	2023-02-14 11:03:20.258529+08	f	\N
73	4	Hello	{1671523212329--1-Ash_Tree.jpg}	2022-12-20 16:00:12.437671+08	2023-02-14 11:03:20.260288+08	t	\N
117	35	I want to plant this can you help me?	{}	2023-01-31 01:32:35.387704+08	2023-02-13 14:59:56.178717+08	t	\N
154	4	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.	{}	2023-02-14 11:03:12.428069+08	2023-02-14 11:03:20.100227+08	t	4
99	27	Hello Everyone!	{}	2023-01-20 19:05:34.619569+08	2023-02-14 11:03:20.110523+08	t	\N
119	1	Please plant this	{}	2023-01-31 15:08:05.054203+08	2023-02-14 11:03:20.216396+08	t	\N
87	4	need	{1671525043865--8958790afce5c7a5d0792ac01cc7aa7f.jpg}	2022-12-20 16:30:44.531031+08	2023-02-14 11:03:20.225134+08	t	\N
86	4	red hot	{1671524973196--d33adab43ec7848e1ce6cfa029029c49.jpg}	2022-12-20 16:29:33.662105+08	2023-02-14 11:03:20.235856+08	t	\N
85	4	i want my view to look like this	{1671524957501--39acc3d755c3f360c1d907dd4e796363.jpg}	2022-12-20 16:29:18.237224+08	2023-02-14 11:03:20.236678+08	f	\N
84	4	whoa this looks good	{1671524915368--e461b0a8447168e0e7f6d53f4fba93a1.jpg}	2022-12-20 16:28:42.960582+08	2023-02-14 11:03:20.237311+08	t	\N
83	4	looking for cuties to plant this	{1671524882994--8a52154d552d619b2de3670485eb1e1a.jpg}	2022-12-20 16:28:06.413104+08	2023-02-14 11:03:20.238593+08	t	\N
82	17	Test post	{1671524882560--6-Conifer_tree-1536x2048.jpg}	2022-12-20 16:28:02.573562+08	2023-02-14 11:03:20.239856+08	t	\N
152	21	Morbi a ipsum. Integer a nibh.	{}	2023-02-14 10:58:12.618412+08	\N	t	21
81	4	Hello i want you to plant this	{1671524845318--6fc7e650d754a46c65b447960069ee44.jpg}	2022-12-20 16:27:26.841555+08	2023-02-14 11:03:20.241816+08	t	\N
116	35	Need a planter for this tree and willing to give a descent tip...	{}	2023-01-30 23:03:10.160949+08	2023-02-13 14:38:53.352453+08	t	\N
80	1	I need any of these trees to be planted...	{1671524814613--Molabe_Tugas_Tree.jpg,1671524814623--Narra-Tree.jpg}	2022-12-20 16:26:54.637683+08	2023-02-14 11:03:20.247767+08	t	\N
79	1	I want a Narra to be planted	{1671524795167--Narra-Tree.jpg}	2022-12-20 16:26:35.178219+08	2023-02-14 11:03:20.250927+08	t	\N
78	1	Plant this for me	{1671524769511--4-cedar-trees.jpg}	2022-12-20 16:26:09.524588+08	2023-02-14 11:03:20.256197+08	f	\N
77	16	I need any of these trees to be planted...	{1671523591393--6-Conifer_tree-1536x2048.jpg,1671523591403--7-Cottonwood_Trees.jpg}	2022-12-20 16:06:31.415342+08	2023-02-14 11:03:20.257137+08	t	\N
153	16	tEST	{}	2023-02-14 10:59:00.253224+08	2023-02-14 11:03:20.100958+08	t	85
93	33	Hello Everyone!	{}	2023-01-05 12:51:27.246785+08	2023-02-14 11:03:20.122426+08	t	\N
91	27	Test Caption	{}	2023-01-05 12:30:49.061278+08	2023-02-14 11:03:20.163017+08	t	\N
90	16	Which Tree is better to plant?	{1672887051135--1-Ash_Tree.jpg,1672887051137--4-cedar-trees.jpg}	2023-01-05 10:50:51.158686+08	2023-02-14 11:03:20.226218+08	t	\N
89	16	is this a tree?	{1671591837511--20a4dcefb25829fe5c99bf2b66e0a034.jpg}	2022-12-21 11:03:57.53233+08	2023-02-14 11:03:20.227293+08	f	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, post_id, user_id, text, date_commented, date_comment_edited) FROM stdin;
45	171	17	Latin?	2023-02-14 17:40:29.158499	2023-02-14 17:40:29.158499
46	91	17	Test Comment\nEditting	2023-02-14 18:35:51.803905	2023-02-14 18:36:01.528053
47	99	27	Gella love cats...	2023-02-14 22:33:55.065387	2023-02-14 22:33:55.065387
48	99	27	Apostrophe,; ;and' quotation' marks" test"	2023-02-14 22:46:11.122828	2023-02-14 22:46:11.122828
49	99	27	MS	2023-02-14 22:47:10.914978	2023-02-14 22:47:10.914978
51	173	20	Get me out of my sight	2023-02-15 10:48:47.30901	2023-02-15 10:48:47.30901
52	152	21	Morbi a ipsum. Integer a nibh.	2023-02-15 10:50:11.23291	2023-02-15 10:50:11.23291
53	152	21	can't set headers	2023-02-15 10:51:20.4708	2023-02-15 10:51:20.4708
54	176	23	Who want vestibulum?	2023-02-15 11:08:42.929523	2023-02-15 11:08:42.929523
9	119	4	Testing comment	2023-02-13 11:27:37.731428	2023-02-13 11:27:37.731428
10	117	4	COmmenting	2023-02-13 11:32:23.512628	2023-02-13 11:32:23.512628
11	116	4	Where are they?	2023-02-13 11:32:30.694657	2023-02-13 11:32:30.694657
\.


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversations (conversation_id, members, created_at, updated_at) FROM stdin;
1	{1,2}	2022-11-24 12:30:12.277	\N
2	{3,4}	2016-06-22 11:10:25	\N
5	{1,4}	2022-11-30 16:43:25.795854	\N
6	{1,16}	2022-11-30 16:43:45.745284	\N
7	{1,27}	2023-01-10 12:55:57.023035	2023-01-10 12:55:57.023035
8	{34,16}	2023-01-10 15:15:04.852142	2023-01-10 15:15:04.852142
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, conversation_id, sender, text, created_at, updated_at) FROM stdin;
1	1	1	Hello Im Vlad	2022-11-29 01:48:08.314187	\N
2	1	2	Hello Im clamp	2022-11-29 01:55:27.36927	\N
3	1	2	Hello Im clamp	2022-11-29 01:57:51.47466	\N
4	1	2	Please be gentle with me	2022-11-29 15:12:26.014827	\N
6	2	4	Hello Ksss	2022-11-30 18:28:45.092398	\N
9	5	1	Are u there?	2022-11-30 18:33:29.667943	\N
10	6	1	Hello Jade	2022-11-30 18:34:02.516798	\N
11	6	1	Hello Jade	2022-11-30 18:34:02.601243	\N
15	1	2	Test	2022-11-30 19:24:44.363941	\N
17	1	1	Clampen	2022-11-30 22:17:56.40218	\N
18	5	1	Hey Ksss	2022-11-30 22:37:44.201906	\N
19	1	1	Yes Ill be	2022-11-30 22:41:12.971801	\N
20	1	1		2022-11-30 22:42:22.903897	\N
21	6	1	Hi Jadius	2022-12-01 08:37:59.118173	\N
22	6	16	Hello Vlad	2022-12-01 08:41:21.597587	\N
23	6	16	Hello Vlad	2022-12-01 08:41:21.682031	\N
24	6	16		2022-12-01 08:41:21.921663	\N
25	6	16	Hi again Vlad	2022-12-01 09:33:13.02739	\N
26	6	1	Hello Jade	2022-12-01 09:37:39.120467	\N
27	6	16	Hi 	2022-12-01 09:38:06.984603	\N
28	6	1	How are u?	2022-12-01 09:38:31.231094	\N
29	6	16	gege	2022-12-01 09:38:54.558784	\N
30	5	4	yow	2022-12-01 14:03:31.948613	\N
31	5	4	slr	2022-12-01 14:04:08.183474	\N
32	5	4	Test	2022-12-01 21:02:56.06984	\N
33	1	1	Hello Ksss	2022-12-02 09:18:32.399304	\N
34	6	1	Hello Jade	2022-12-02 09:19:38.419888	\N
35	5	1	Yes Vlad?	2022-12-08 21:06:33.542696	\N
36	5	4	What? Are u insane? Youre Vlad Im Ksss LOL	2022-12-08 21:37:20.342329	\N
37	5	1	Database's Properties	2022-12-08 22:05:51.394887	\N
38	5	1	The dbrnd Blog's Reviews	2022-12-08 22:08:27.656145	\N
39	5	4	We'll could've	2022-12-08 22:21:12.983339	\N
40	2	4	Hello Lyn	2022-12-08 23:38:48.200562	\N
41	2	3	Yes Hi Ksss	2022-12-08 23:52:38.781865	\N
42	2	3	Do you need something?	2022-12-08 23:54:15.82755	\N
43	2	4	Yes po	2022-12-08 23:56:31.272972	\N
44	2	4	I want	2022-12-08 23:57:11.606524	\N
45	5	4	qwerqwer	2022-12-09 09:07:31.791303	\N
46	5	4	Hello there Vlad	2022-12-09 17:52:43.535706	\N
47	6	16	Hey Vlad, SLR	2022-12-14 23:24:05.417091	2022-12-14 23:24:05.417091
48	6	16	How're you?	2022-12-14 23:26:58.505431	2022-12-14 23:26:58.505431
49	6	16	Hi did you plant some trees?	2022-12-21 10:55:48.187568	2022-12-21 10:55:48.187568
50	5	1	Well?	2023-01-10 12:06:45.958087	2023-01-10 12:06:45.958087
51	8	34	Hello	2023-01-10 15:17:22.662771	2023-01-10 15:17:22.662771
52	8	16	Hiii	2023-01-10 15:18:49.728051	2023-01-10 15:18:49.728051
53	7	27	Hello Vlad	2023-01-22 20:17:54.616392	2023-01-22 20:17:54.616392
54	6	1	Yes, it was 2 months ago, and now it's growing well...	2023-02-16 00:57:18.956588	2023-02-16 00:57:18.956588
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, user_id, post_description, pictures, date_posted, date_edited, available, tree_id) FROM stdin;
119	1	Please plant this	{}	2023-01-31 15:08:05.054203+08	2023-02-16 01:11:07.83714+08	t	\N
73	4	Hello	{1671523212329--1-Ash_Tree.jpg}	2022-12-20 16:00:12.437671+08	2023-02-16 01:11:07.893974+08	t	\N
117	35	I want to plant this can you help me?	{}	2023-01-31 01:32:35.387704+08	2023-02-16 01:11:07.838515+08	t	\N
184	32	Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.	{}	2022-11-07 17:32:46+08	2023-02-16 01:11:07.899206+08	f	32
116	35	Need a planter for this tree and willing to give a descent tip...	{}	2023-01-30 23:03:10.160949+08	2023-02-16 01:11:07.840122+08	t	\N
99	27	Hello Everyone!	{}	2023-01-20 19:05:34.619569+08	2023-02-16 01:11:07.843217+08	t	\N
87	4	need	{1671525043865--8958790afce5c7a5d0792ac01cc7aa7f.jpg}	2022-12-20 16:30:44.531031+08	2023-02-16 01:11:07.860823+08	t	\N
187	35	Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.	{}	2022-10-04 09:39:56+08	2023-02-16 01:11:07.906952+08	f	35
86	4	red hot	{1671524973196--d33adab43ec7848e1ce6cfa029029c49.jpg}	2022-12-20 16:29:33.662105+08	2023-02-16 01:11:07.865068+08	t	\N
85	4	i want my view to look like this	{1671524957501--39acc3d755c3f360c1d907dd4e796363.jpg}	2022-12-20 16:29:18.237224+08	2023-02-16 01:11:07.867886+08	f	\N
84	4	whoa this looks good	{1671524915368--e461b0a8447168e0e7f6d53f4fba93a1.jpg}	2022-12-20 16:28:42.960582+08	2023-02-16 01:11:07.871245+08	t	\N
83	4	looking for cuties to plant this	{1671524882994--8a52154d552d619b2de3670485eb1e1a.jpg}	2022-12-20 16:28:06.413104+08	2023-02-16 01:11:07.872521+08	t	\N
180	27	Quisque ut erat. Curabitur gravida nisi at nibh.	{}	2022-08-25 01:12:08+08	2023-02-16 01:11:07.911843+08	t	27
82	17	Test post	{1671524882560--6-Conifer_tree-1536x2048.jpg}	2022-12-20 16:28:02.573562+08	2023-02-16 01:11:07.875299+08	t	\N
183	31	Praesent blandit. Nam nulla.	{}	2022-07-06 14:07:34+08	2023-02-16 01:11:07.918853+08	f	31
185	33	In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.	{}	2022-06-19 08:37:51+08	2023-02-16 01:11:07.926563+08	f	33
181	29	Integer ac neque. Duis bibendum.	{}	2022-04-04 03:38:19+08	2023-02-16 01:11:07.940392+08	f	29
176	23	Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.	{}	2022-03-28 13:04:50+08	2023-02-16 01:11:07.942844+08	t	23
186	34	Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.	{}	2022-03-10 02:45:14+08	2023-02-16 01:11:07.944926+08	t	34
81	4	Hello i want you to plant this	{1671524845318--6fc7e650d754a46c65b447960069ee44.jpg}	2022-12-20 16:27:26.841555+08	2023-02-16 01:11:07.878862+08	t	\N
80	1	I need any of these trees to be planted...	{1671524814613--Molabe_Tugas_Tree.jpg,1671524814623--Narra-Tree.jpg}	2022-12-20 16:26:54.637683+08	2023-02-16 01:11:07.881053+08	t	\N
79	1	I want a Narra to be planted	{1671524795167--Narra-Tree.jpg}	2022-12-20 16:26:35.178219+08	2023-02-16 01:11:07.884598+08	t	\N
78	1	Plant this for me	{1671524769511--4-cedar-trees.jpg}	2022-12-20 16:26:09.524588+08	2023-02-16 01:11:07.88916+08	f	\N
77	16	I need any of these trees to be planted...	{1671523591393--6-Conifer_tree-1536x2048.jpg,1671523591403--7-Cottonwood_Trees.jpg}	2022-12-20 16:06:31.415342+08	2023-02-16 01:11:07.89046+08	t	\N
256	1	Narra Tree	{1676480064038--Narra-Tree.jpg}	2023-02-16 00:54:24.131468+08	2023-02-16 01:11:07.802345+08	t	88
248	17	Lime Tree	{1676364966639--23_lime_Tree.jpg}	2023-02-14 16:56:06.726318+08	2023-02-16 01:11:07.822048+08	t	86
154	4	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.	{}	2023-02-14 11:03:12.428069+08	2023-02-16 01:11:07.822574+08	t	4
152	21	Morbi a ipsum. Integer a nibh.	{}	2023-02-14 10:58:12.618412+08	2023-02-16 01:11:07.83425+08	t	21
75	16	I would like to plant trees and who's willing to help me.	{1671523485047--3-birch-trees.jpg}	2022-12-20 16:04:45.064716+08	2023-02-16 01:11:07.891596+08	f	\N
159	5	Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.	{}	2022-04-16 10:37:13+08	2023-02-16 01:11:07.935675+08	f	5
257	2	Cherry Trees	{1676481066146--5-cherry-trees.jpg}	2023-02-16 01:11:06.230883+08	2023-02-16 01:11:07.69068+08	t	89
249	17	3 Trees	{1676371044282--1-Ash_Tree.jpg,1676371044284--2-aspen-trees.jpg,1676371044291--3-birch-trees.jpg}	2023-02-14 18:37:24.390812+08	2023-02-16 01:11:07.80502+08	t	85
153	16	tEST	{}	2023-02-14 10:59:00.253224+08	2023-02-16 01:11:07.832445+08	t	85
169	15	Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.	{}	2023-01-06 12:10:49+08	2023-02-16 01:11:07.845998+08	t	15
93	33	Hello Everyone!	{}	2023-01-05 12:51:27.246785+08	2023-02-16 01:11:07.849918+08	t	\N
91	27	Test Caption	{}	2023-01-05 12:30:49.061278+08	2023-02-16 01:11:07.852137+08	t	\N
90	16	Which Tree is better to plant?	{1672887051135--1-Ash_Tree.jpg,1672887051137--4-cedar-trees.jpg}	2023-01-05 10:50:51.158686+08	2023-02-16 01:11:07.854035+08	t	\N
89	16	is this a tree?	{1671591837511--20a4dcefb25829fe5c99bf2b66e0a034.jpg}	2022-12-21 11:03:57.53233+08	2023-02-16 01:11:07.858542+08	f	\N
158	4	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.	{}	2022-11-23 00:33:10+08	2023-02-16 01:11:07.89651+08	t	4
174	21	Morbi a ipsum. Integer a nibh.	{}	2022-10-23 20:40:37+08	2023-02-16 01:11:07.902211+08	t	21
157	3	Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.	{}	2022-10-12 23:49:25+08	2023-02-16 01:11:07.905884+08	t	3
173	20	Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.	{}	2022-09-07 23:09:58+08	2023-02-16 01:11:07.909209+08	f	20
155	1	In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.	{}	2022-08-11 14:15:15+08	2023-02-16 01:11:07.916776+08	t	1
171	17	Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.	{}	2022-06-28 21:47:32+08	2023-02-16 01:11:07.924359+08	t	17
156	2	Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.	{}	2022-06-14 18:18:54+08	2023-02-16 01:11:07.929095+08	f	2
170	16	Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.	{}	2022-06-09 23:37:59+08	2023-02-16 01:11:07.933054+08	t	16
\.


--
-- Data for Name: trees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trees (tree_id, name, family, tree_description, scientific_name, created_at, updated_at) FROM stdin;
1	Oblongleaf Bluebells	Boraginaceae	Spontaneous Barley	Mertensia oblongifolia (Nutt.) G. Don	2022-07-08 02:51:46	\N
2	Piper's Bluegrass	Poaceae	Knotweed Spineflower	Poa piperi Hitchc.	2023-01-29 05:17:52	\N
3	Guapira	Nyctaginaceae	Miniature Lupine	Guapira Aubl.	2023-02-08 09:31:15	\N
4	Sea Fig	Aizoaceae	Smooth Flatsedge	Carpobrotus chilensis (Molina) N.E. Br.	2022-12-11 18:47:52	\N
5	Cornflag	Iridaceae	Hebe	Gladiolus dalenii Van Geel	2022-11-13 10:35:35	\N
6	Pointed Rush	Juncaceae	Rusby's Globemallow	Juncus oxymeris Engelm.	2022-04-15 21:59:12	\N
7	Bighead Knapweed	Asteraceae	Soulard Crab	Centaurea macrocephala Puschk. ex Willd.	2023-01-26 11:25:02	\N
8	Little Green Sedge	Cyperaceae	Oneflower Helianthella	Carex viridula Michx.	2022-03-31 04:45:29	\N
9	Mason's Neststraw	Asteraceae	Sandstede's Wart Lichen	Stylocline masonii Morefield	2022-07-15 15:42:47	\N
10	Loxospora Lichen	Haematommataceae	Yellow Rabbitbrush	Loxospora elatina (Ach.) A. Massal.	2022-03-14 01:57:55	\N
11	Palo Bronco	Malpighiaceae	Soursop	Malpighia fucata Ker Gawl.	2022-08-26 17:06:35	\N
12	Ross' Bentgrass	Poaceae	Groundcover Milkvetch	Agrostis rossiae Vasey	2023-01-12 09:19:22	\N
13	Gumhead	Asteraceae	Mt. Albert Goldenrod	Gymnosperma glutinosum (Spreng.) Less.	2022-10-17 09:42:28	\N
14	Brown Fritillary	Liliaceae	Clustered Lady's Mantle	Fritillaria micrantha A. Heller	2022-03-20 23:30:22	\N
15	Largeflower False Lobelia	Campanulaceae	Melaspilea Lichen	Trematolobelia grandifolia (Rock) O. Deg.	2022-08-13 17:04:09	\N
16	Oregon Yampah	Apiaceae	Nodule Cracked Lichen	Perideridia oregana (S. Watson) Mathias	2023-01-07 02:01:45	\N
17	Smooth Rose	Rosaceae	Louisiana Broomrape	Rosa blanda Aiton var. glabra CrÃ©p.	2022-08-27 05:03:51	\N
18	Morro Milkvetch	Fabaceae	European Searocket	Astragalus curtipes A. Gray	2022-10-14 09:39:30	\N
19	Mediterranean Grass	Poaceae	Slender Bulrush	Schismus P. Beauv.	2022-07-20 11:43:16	\N
20	Trinity Mountain Rockcress	Brassicaceae	Sapota	Arabis rigidissima Rollins	2022-04-25 21:57:54	\N
21	West Indian Milkwort	Polygalaceae	Mudbank Crowngrass	Polygala hecatantha Urb.	2022-07-25 20:12:24	\N
22	Smallflower Hairy Willowherb	Onagraceae	Sneezeweed	Epilobium parviflorum Schreb.	2022-06-25 08:48:28	\N
23	Porpidia Lichen	Porpidiaceae	Algodones Sunflower	Porpidia subsimplex (H. Magn.) ?, ined.?	2022-04-29 10:48:58	\N
24	Kansas Aschisma Moss	Pottiaceae	Horseweed	Aschisma kansanum A.L. Andrews	2022-08-14 03:10:43	\N
25	Poeppig's Rosemallow	Malvaceae	Eastern Milkpea	Hibiscus poeppigii (Spreng.) Garcke	2022-03-04 20:38:04	\N
26	Endolepis	Chenopodiaceae	Fiveflower Rockdaisy	Endolepis Torr.	2022-10-27 15:44:17	\N
27	Lampranthus	Aizoaceae	Woodland Geranium	Lampranthus N.E. Br.	2022-10-02 19:52:22	\N
28	Atlantic Ivy	Araliaceae	South Idaho Penstemon	Hedera hibernica (G. Kirchn.) Bean	2022-10-29 10:08:34	\N
29	Bur Bristlegrass	Poaceae	Spike Lichen	Setaria adhaerens (Forssk.) Chiov.	2023-01-28 03:26:16	\N
30	Purple Fringeless Orchid	Orchidaceae	Mt. Diablo Manzanita	Platanthera peramoena (A. Gray) A. Gray	2022-09-14 16:39:42	\N
31	Yellow Archangel	Lamiaceae	Yellow Pepperweed	Lamiastrum galeobdolon (L.) Ehrend. & Polatschek	2022-09-03 09:08:13	\N
32	Prickly Clover	Fabaceae	Prostrate Sandmat	Trifolium echinatum M. Bieb.	2022-11-30 05:44:15	\N
33	Pinkroot	Loganiaceae	Leonard's Beardtongue	Spigelia L.	2022-08-17 17:49:20	\N
34	Pricklyphlox	Polemoniaceae	Little Nipple Cactus	Leptodactylon Hook. & Arn.	2022-11-30 19:10:05	\N
35	Strangospora Lichen	Acarosporaceae	Nevada Agave	Strangospora A. Massal.	2022-07-21 13:21:12	\N
36	Pseudostellaria	Caryophyllaceae	Dusty Beardtongue	Pseudostellaria sierrae Rabeler & R.L. Hartm.	2022-05-06 09:52:05	\N
37	Collegeflower	Asteraceae	Torrey's Blue Eyed Mary	Hymenopappus flavescens A. Gray var. flavescens	2022-10-23 14:15:24	\N
38	Slender Woollyheads	Asteraceae	West Indian Woodnettle	Psilocarphus tenellus Nutt.	2022-06-19 06:33:08	\N
39	Betel Palm	Arecaceae	Slenderhorn Spineflower	Areca catechu L.	2022-07-29 13:48:10	\N
40	Rockface Cyrtandra	Gesneriaceae	Alaska Bluegrass	Cyrtandra wawrae C.B. Clarke	2023-01-04 00:39:32	\N
41	Mountain Blue-eyed Grass	Iridaceae	Schweinitz's Dotted Lichen	Sisyrinchium sarmentosum Suksd. ex Greene	2022-05-15 02:29:16	\N
42	Bleeding Heart	Fumariaceae	Water Jacket	Dicentra Bernh.	2022-09-28 04:10:49	\N
43	Australian Treefern	Dicksoniaceae	Kern's Pitted Onion	Dicksonia antarctica Labill.	2022-05-15 07:14:00	\N
44	Dudley's Clarkia	Onagraceae	Giant Swordfern	Clarkia dudleyana (Abrams) J.F. Macbr.	2022-03-31 04:17:59	\N
45	Little Lemonhead	Asteraceae	Roundleaf Bladderpod	Coreocarpus arizonicus (A. Gray) S.F. Blake	2022-06-15 21:09:22	\N
46	Royal Spleenwort	Aspleniaceae	Appalachian Rim Lichen	Asplenium insiticium Brack.	2022-04-19 13:15:09	\N
47	Torrey's Beaksedge	Cyperaceae	Hinds' Nightshade	Rhynchospora torreyana A. Gray	2022-12-06 23:00:08	\N
48	Isolated Blazingstar	Loasaceae	Alkalisink Goldfields	Mentzelia isolata Gentry	2022-10-08 19:51:10	\N
49	Cicendia	Gentianaceae	Koenigia	Cicendia Adans.	2023-01-08 12:58:52	\N
50	Sechium	Cucurbitaceae	Poorland Flatsedge	Sechium P. Br.	2022-08-05 12:34:59	\N
51	Cup Lichen	Cladoniaceae	Cordyla	Cladonia macrophyllodes Nyl.	2022-05-28 14:18:22	\N
52	Parry's Wirelettuce	Asteraceae	Fabronia Moss	Stephanomeria parryi A. Gray	2022-09-22 02:51:29	\N
53	Long-flower Marlock	Myrtaceae	Florida Calamint	Eucalyptus macrandra F. Muell. ex Benth.	2022-10-08 02:00:05	\N
54	Sphagnum	Sphagnaceae	Scorpionbush	Sphagnum flexuosum Dozy & Molk.	2023-02-09 07:13:55	\N
55	Narrow Swordfern	Dryopteridaceae	Rugose Rim Lichen	Nephrolepis cordifolia (L.) C. Presl	2022-11-05 07:25:11	\N
56	Cenizo	Melastomataceae	Kangaroo Vine	Tetrazygia urbanii Cogn.	2022-07-09 05:49:27	\N
57	Nevin's Brickellbush	Asteraceae	Showy Goldeneye	Brickellia nevinii A. Gray	2022-12-31 08:58:25	\N
58	Shortleaf Yelloweyed Grass	Xyridaceae	Giant Blue Eyed Mary	Xyris brevifolia Michx.	2022-08-12 15:50:20	\N
59	Melanelia Lichen	Parmeliaceae	California Rayless Fleabane	Melanelia fuliginosa (Fr. ex Duby) Essl.	2022-10-14 15:38:21	\N
60	Willowherb	Onagraceae	Shortawn Foxtail	Epilobium Ã—pulchrum Suksd. (pro sp.)	2022-10-29 11:39:52	\N
61	Large Yellow Loosestrife	Primulaceae	Texas Redbud	Lysimachia punctata L.	2022-11-27 06:17:38	\N
62	Catalina Ironwood	Rosaceae	Tarweed	Lyonothamnus floribundus A. Gray ssp. floribundus	2022-09-23 18:33:21	\N
63	Dwarf Checkerbloom	Malvaceae	Sphagnum	Sidalcea sparsifolia (C.L. Hitchc.) S.R. Hill	2022-04-20 02:42:09	\N
64	Bartramiopsis Moss	Polytrichaceae	Melaspilea Lichen	Bartramiopsis Kindb.	2022-05-30 05:23:18	\N
65	Earth Lichen	Verrucariaceae	Betel Palm	Catapyrenium heppioides (Zahlbr.) J.W. Thomson	2022-02-18 15:19:13	\N
66	Lemon Beebalm	Lamiaceae	Tejon Cryptantha	Monarda citriodora Cerv. ex Lag.	2022-12-01 07:40:29	\N
67	Caribbean Seagrass	Hydrocharitaceae	Puffcalyx Gilia	Halophila decipiens Ostenf.	2022-03-10 11:31:50	\N
68	Parmotrema Lichen	Parmeliaceae	Tiny Mousetail	Parmotrema A. Massal.	2022-06-21 09:54:03	\N
69	Key West Heliotrope	Boraginaceae	Chambers' Bluegrass	Heliotropium fruticosum L.	2022-06-05 22:01:01	\N
70	Low Sphagnum	Sphagnaceae	Pouteria	Sphagnum compactum DC.	2023-02-02 01:40:52	\N
71	Tanners Canyon Onion	Liliaceae	Sharpscale Spikerush	Allium plummerae S. Watson	2022-10-20 20:29:36	\N
72	Rougeplant	Phytolaccaceae	Yuma Silverbush	Rivina humilis L.	2022-03-21 02:44:01	\N
73	Tortella Moss	Pottiaceae	Absaroka Range Beardtongue	Tortella humilis (Hedw.) Jenn.	2022-12-13 12:03:32	\N
74	Border Pricklypear	Cactaceae	Cliff Schiedea	Opuntia atrispina Griffiths	2022-08-08 03:53:06	\N
75	Bellybutton Veinfern	Dryopteridaceae	Hairy Grama	Phanerophlebia umbonata Underw.	2022-09-03 08:24:44	\N
76	Cartilage Lichen	Ramalinaceae	Ashen Milkvetch	Ramalina calicaris (L.) Fr.	2022-08-26 07:51:49	\N
77	Largeleaf Jointweed	Polygonaceae	Obtuseleaf Schistidium Moss	Polygonella macrophylla Small	2022-08-05 23:33:21	\N
78	Diplotomma Lichen	Physciaceae	Florida Poisontree	Diplotomma ambiguum (Ach.) Flagey	2022-02-25 08:14:41	\N
79	Chihuahuan Prairie Clover	Fabaceae	Largebract Spiderling	Dalea exigua Barneby	2022-12-31 07:12:15	\N
80	Japanese Alder	Betulaceae	Desert Horsepurslane	Alnus japonica (Thunb.) Steud.	2023-02-08 11:33:44	\N
81	Tusayan Fameflower	Portulacaceae	Castorbean	Phemeranthus validulus (Greene) Kiger	2022-11-10 00:15:10	\N
82	Groundcover Milkvetch	Fabaceae	Fountain Butterflybush	Astragalus humistratus A. Gray	2022-06-17 21:53:03	\N
83	Fendler's Rockcress	Brassicaceae	Snow Squarestem	Arabis fendleri (S. Watson) Greene	2023-01-15 03:46:48	\N
84	Prostrate Cup Lichen	Cladoniaceae	Slender Cleomella	Cladonia prostrata A. Evans	2022-08-06 04:02:42	\N
85	test tree	\N	\N	\N	2023-02-14 10:59:00.251386	\N
86	lime tree	\N	\N	\N	2023-02-14 16:56:06.71996	\N
87	test 7	\N	\N	\N	2023-02-15 13:18:50.337281	\N
88	narra	\N	\N	\N	2023-02-16 00:54:24.120234	\N
89	cherry trees	\N	\N	\N	2023-02-16 01:11:06.228919	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, first_name, last_name, email, gender, address, password) FROM stdin;
1	vwadsworth0	Vincenz	Wadsworth	vwadsworth0@lycos.com	Male	8 Westerfield Point	$2a$10$Sjxbr4YVTqE9/TRgXozr0eFcq2NMh/g2DADkO/G4JyNgqpe7XNyyy
3	aklyner7	Annabelle	Klyner	aklyner7@weebly.com	Female	5747 Schlimgen Way	$2a$10$K5d/FAZGwFcA6MxXkw4a/ObcUgIKJiY5CH/iwibUO3rlRWOrhld2q
4	ksss	Karl	Taleon	karlriel@gmail.com	male	Aluba, CDO	$2a$10$FiRAOTQVVA9uyCHUOKIv6u8uegtDfrdkfyZTY0pt/aLDogC5zqbzu
5	ldinsey4	Lindsey	Lohan	ldinsey4@mapquest.com	female	14521 Arrowood Trail	$2a$10$nmrXcsGOQuyJ3phNtOEQ8eB03lSCkLoJsv8N2I33lc7r2Q98xlcmy
15	mstovin6	Malissia	Stovin	mstovin6@netlog.com	Female	5747 Schlimgen Way	$2a$10$9O6wTsScjraOttLxxEZrWeq78xn3hMj2qEFnkbR4XGISvNDBI5X4S
17	jadexp	Jade	Obidos	jadeobidos@yahoo.com	male	Barra, Opol	$2a$10$hpmy/0o6LfCq3Nqjgb5DueQmgTmWfQS0okQTxeSpWPpwCen36TiAa
20	gpostle2	Garreth	Postle	gpostle2@technorati.com	male	105 Clyde Gallagher Lane	$2a$10$TiQ/cdSISDqgUpsQvkENRORlCuHPBQXGpxu30UsJRv/VJVYilLPYi
21	skar	Scar	Iamscar	iamscar@scar.com	male	World of Azeroth	$2a$10$.hfeH7kFNDlxhsHNxmkmfe0kPFchgqN.0rhekgj7Yv455rEllkL5C
23	TensaZangetsu	Ichigo	Kurosaki	gotei13@bleach.com	male	Soul Society	$2a$10$Pj3TXXXfgNTXJpAvjjvGgOjpkA70OikZUV/pkC4BnFvdgBXSS0mvK
27	sponsor_test	Sponsor	Test	sponstest@test.com	male	sponsors address	$2a$10$mnqfw2I5fH9A7dF6CMUv1OhLDHFyRzItIXToCZe5CjlW46E2JvUc6
28	qwerty	Qwert	Qwert	Qwert@qwerty.com	male	Qwerty	$2a$10$ku/HlPxTRy57tmzIuwIwHewnP49euhB7gT.1qc3dZxkruNvMJv6m2
29	joyjoy	Rubeth Joy	Padernal	joy@stacktreck.com	female	Ilo-Ilo City	$2a$10$Ofha0PjndQwCgeVJAjfj3eYQBw3rpXTnqbKMxIIk7H9UqJgzOvbvm
31	Test	Test	Test	test@test.com	male	Barra, Opol	$2a$10$k9NwdoF4omFUBBZ/COQTtOz28fSbsEFzXfywS5zClpNqUG8FbtiAW
32	tsalmond2r	Tremaine	Salmond	tsalmond2r@imdb.com	male	7 Vernon Pass	$2a$10$wU3LbIK7ibSZ4/Jgvl0/DuqQXefr7gtfniXA2ltdfm03WkUiziCfO
33	boke2q	Bette	Oke	boke2q@engadget.com	female	77406 Grover Court	$2a$10$ZTZqtwPRaWlHDjq4SGPYne4MS5wVC1AuMHpqUDJsTLuY6FxlFtE0S
34	ariessa123	Ariessa	Ko	ariessako@gmail.com	female	test	$2a$10$OfK8Ejvjm2hnuZ427xZnu.uAFHWNhAQp3TQge68l5ggv4VkJbX0iG
35	planter_test	Beluga	Test	belugaplanter@test.com	male	Discord Area	$2a$10$/126ZxrmlehKe00x71yaOOV5Df7ex.KShmaJZbIGFKfap4vh2Vt96
16	jadiusxp	Jade	Obidos	jadius@beluga.com	male	Barra, Opol, Mis. Or.	$2a$10$byJiYoPFg6Gf2xTA7bGZaOgZgn0QdZjp02geyHEJQj.OGnVbg6auK
36	test_user	test	test	beluga@test.com	male	Test Location	$2a$10$h9PFYQHjx7mN8IaGjCy.PO071lbMQPaM6k8dxNyM16g2qiud.NKjq
37	starkertrekker	Jon	Snow	jonsnow@got.com	male	Winterfell, Northern Seven Kingdoms	$2a$10$4.yU/DAGpvzRedqooH345.31TaCVHGRjVGH0S8NQSoYV2aMY0x8SO
2	clampen1	Cindy	Lampen	clampen1@joomla.org	Female	14521 Arrowood Trail	$2a$10$iveKh7lJvI17cfTKoroz2.wBY8JT3kK5UdLky45DFkX2.WecaU3Wu
\.


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 55, true);


--
-- Name: conversations_conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 8, true);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 54, true);


--
-- Name: pictures_picture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pictures_picture_id_seq', 77, true);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 257, true);


--
-- Name: trees_tree_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trees_tree_id_seq', 89, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 37, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: avatars pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avatars
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (photo_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: trees trees_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trees
    ADD CONSTRAINT trees_name_key UNIQUE (name);


--
-- Name: trees trees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trees
    ADD CONSTRAINT trees_pkey PRIMARY KEY (tree_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id) ON DELETE CASCADE;


--
-- Name: avatars pictures_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avatars
    ADD CONSTRAINT pictures_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_tree_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_tree_id_fkey FOREIGN KEY (tree_id) REFERENCES public.trees(tree_id) ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

