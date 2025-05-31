import styled from "styled-components";
import { FaSearch, FaTimes, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const SideMenuContainer = styled.div`
	width: 240px;
	background-color: var(--neutral-100);
	padding: var(--spacing-md);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: fit-content;
	position: sticky;
	top: var(--spacing-md);

	@media (max-width: 768px) {
		width: 100%;
		position: relative;
		top: 0;
		padding: var(--spacing-sm);
	}
`;

const MenuTitle = styled.h2<{ isOpen: boolean }>`
	color: var(--neutral-800);
	font-size: var(--font-size-large);
	padding-bottom: var(--spacing-sm);
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;

	@media (max-width: 768px) {
		font-size: var(--font-size-normal);
		padding-left: var(--spacing-sm);
		padding-right: var(--spacing-sm);
		padding-bottom: ${(props) => (props.isOpen ? "var(--spacing-md)" : "0")};
	}
`;

const MenuToggle = styled(FaChevronDown)<{ isOpen: boolean }>`
	display: none;
	transition: transform 0.3s ease;
	transform: rotate(${(props) => (props.isOpen ? "180deg" : "0")});

	@media (max-width: 768px) {
		display: block;
	}
`;

const MenuContent = styled.div<{ isOpen: boolean }>`
	@media (max-width: 768px) {
		display: ${(props) => (props.isOpen ? "block" : "none")};
	}
`;

const SearchContainer = styled.div`
	position: relative;
	margin-bottom: var(--spacing-sm);
	display: flex;
	gap: var(--spacing-sm);
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 0.5rem 2.5rem 0.5rem 2rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 1rem;
	background-color: white;
	color: #333;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: #ff6b00;
		box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
	}
`;

const SearchIcon = styled(FaSearch)`
	position: absolute;
	left: 0.5rem;
	top: 50%;
	transform: translateY(-50%);
	color: #666;
	pointer-events: none;
`;

const ClearButton = styled.button`
	position: absolute;
	right: 0.5rem;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
	padding: 0;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		color: #333;
	}
`;

const MenuList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	@media (max-width: 768px) {
		display: flex;
		flex-wrap: wrap;
	}
`;

const MenuItem = styled.li<{ isActive?: boolean }>`
	padding: var(--spacing-sm) var(--spacing-md);
	cursor: pointer;
	color: ${(props) =>
		props.isActive ? "var(--primary-color)" : "var(--neutral-700)"};
	background-color: ${(props) =>
		props.isActive ? "var(--neutral-200)" : "transparent"};
	font-weight: ${(props) => (props.isActive ? "600" : "400")};
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	border-left: ${(props) =>
		props.isActive ? "4px solid var(--primary-color)" : "none"};

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	font-size: 1rem;
	line-height: 1.2;

	&:hover {
		color: var(--primary-color);
		background-color: var(--neutral-200);
		border-left: 4px solid var(--primary-color);
	}

	@media (max-width: 768px) {
		text-overflow: clip;
		overflow: hidden;
		white-space: normal;
		margin-bottom: 0.5rem;
		border-right: 1px solid var(--neutral-500);
		border-left: none;
		&:hover {
			border-left: none;
		}
	}
`;

interface SideMenuProps {
	onSelect?: (item: string) => void;
	selectedItem?: string;
	onSearch?: (query: string) => void;
	categoryList: string[];
}

const SideMenu = ({
	onSelect,
	selectedItem,
	onSearch,
	categoryList,
}: SideMenuProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSearch = () => {
		onSearch?.(searchValue);
		setIsOpen(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleClear = () => {
		setSearchValue("");
		onSearch?.("");
	};

	const handleSelect = (item: string) => {
		setSearchValue("");
		onSearch?.("");
		onSelect?.(item);
		setIsOpen(false);
	};

	const menuItems = ["全部作品", ...categoryList];

	return (
		<SideMenuContainer>
			<MenuTitle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
				卡牌分類
				<MenuToggle isOpen={isOpen} />
			</MenuTitle>
			<MenuContent isOpen={isOpen}>
				<SearchContainer>
					<div style={{ position: "relative", flex: 1 }}>
						<SearchIcon />
						<SearchInput
							type="text"
							placeholder="搜尋卡牌..."
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							onKeyDown={handleKeyPress}
						/>
						{searchValue && (
							<ClearButton onClick={handleClear}>
								<FaTimes />
							</ClearButton>
						)}
					</div>
				</SearchContainer>
				<MenuList>
					{menuItems.map((item) => (
						<MenuItem
							key={item}
							onClick={() => handleSelect(item)}
							isActive={item === selectedItem}
							title={item}
						>
							{item}
						</MenuItem>
					))}
				</MenuList>
			</MenuContent>
		</SideMenuContainer>
	);
};

export default SideMenu;
