--
-- Name: admin; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE admin (
    admin_id integer NOT NULL,
    admin_username character varying,
    password character varying,
    email_address character varying
);


ALTER TABLE admin OWNER TO namethatcardadmin;

--
-- Name: adminSessions; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE "adminSessions" (
    admin_id bigint NOT NULL,
    ssid_sessions character varying
);


ALTER TABLE "adminSessions" OWNER TO namethatcardadmin;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: namethatcardadmin
--

CREATE SEQUENCE admin_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin_admin_id_seq OWNER TO namethatcardadmin;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: namethatcardadmin
--

ALTER SEQUENCE admin_admin_id_seq OWNED BY admin.admin_id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE cards (
    card_id integer NOT NULL,
    game_id bigint NOT NULL,
    card_name character varying,
    card_category character varying,
    year bigint,
    mask character varying,
    image character varying,
    image_after character varying,
    ebay_link character varying,
    category_a character varying,
    category_b character varying,
    category_c character varying
);


ALTER TABLE cards OWNER TO namethatcardadmin;

--
-- Name: game; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE game (
    game_id integer NOT NULL,
    game_name character varying,
    category_a character varying,
    category_b character varying,
    category_c character varying,
    background character varying,
    font character varying,
    game_icon character varying,
    years boolean,
    game_logo character varying
);


ALTER TABLE game OWNER TO namethatcardadmin;

--
-- Name: gama_n_game_id_seq; Type: SEQUENCE; Schema: public; Owner: namethatcardadmin
--

CREATE SEQUENCE gama_n_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE gama_n_game_id_seq OWNER TO namethatcardadmin;

--
-- Name: gama_n_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: namethatcardadmin
--

ALTER SEQUENCE gama_n_game_id_seq OWNED BY game.game_id;


--
-- Name: game_card_cat_lookup; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE game_card_cat_lookup (
    game_id smallint NOT NULL,
    category character varying,
    definition character varying
);


ALTER TABLE game_card_cat_lookup OWNER TO namethatcardadmin;

--
-- Name: game_categories; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE game_categories (
    game_id bigint NOT NULL,
    game_name character varying,
    game_category character varying
);


ALTER TABLE game_categories OWNER TO namethatcardadmin;

--
-- Name: game_rules; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE game_rules (
    game_id bigint,
    difficulty_level character varying,
    "column" character varying,
    mask_id character varying,
    game_name character varying
);


ALTER TABLE game_rules OWNER TO namethatcardadmin;

--
-- Name: game_try; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE game_try (
    game character varying,
    level character varying,
    catetory_a character varying,
    category_b character varying,
    category_c character varying,
    category_d character varying
);


ALTER TABLE game_try OWNER TO namethatcardadmin;

--
-- Name: player_history; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE player_history (
    history_id integer NOT NULL,
    "user" character varying,
    game character varying,
    difficulty_level character varying,
    score bigint
);


ALTER TABLE player_history OWNER TO namethatcardadmin;

--
-- Name: player_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: namethatcardadmin
--

CREATE SEQUENCE player_history_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE player_history_history_id_seq OWNER TO namethatcardadmin;

--
-- Name: player_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: namethatcardadmin
--

ALTER SEQUENCE player_history_history_id_seq OWNED BY player_history.history_id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE sessions (
    user_id bigint,
    ssid character varying
);


ALTER TABLE sessions OWNER TO namethatcardadmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: namethatcardadmin
--

CREATE TABLE users (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email_address character varying
);


ALTER TABLE users OWNER TO namethatcardadmin;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: namethatcardadmin
--

CREATE SEQUENCE users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_user_id_seq OWNER TO namethatcardadmin;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: namethatcardadmin
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: namethatcardadmin
--

ALTER TABLE ONLY admin ALTER COLUMN admin_id SET DEFAULT nextval('admin_admin_id_seq'::regclass);


--
-- Name: game game_id; Type: DEFAULT; Schema: public; Owner: namethatcardadmin
--

ALTER TABLE ONLY game ALTER COLUMN game_id SET DEFAULT nextval('gama_n_game_id_seq'::regclass);


--
-- Name: player_history history_id; Type: DEFAULT; Schema: public; Owner: namethatcardadmin
--

ALTER TABLE ONLY player_history ALTER COLUMN history_id SET DEFAULT nextval('player_history_history_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: namethatcardadmin
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);

--
-- Name: adminSessions adminSessions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY "adminSessions"
    ADD CONSTRAINT "adminSessions_pkey" PRIMARY KEY (admin_id);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (card_id);


--
-- Name: game gama_n_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY game
    ADD CONSTRAINT gama_n_pkey PRIMARY KEY (game_id);


--
-- Name: player_history player_history_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY player_history
    ADD CONSTRAINT player_history_pkey PRIMARY KEY (history_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);