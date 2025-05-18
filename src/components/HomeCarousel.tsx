import styled from "styled-components";
import { Carousel } from "antd";

// 輪播容器
const CarouselContainer = styled.div`
	margin-bottom: var(--spacing-sm);
	padding: 0 var(--spacing-md);
	position: relative;

	.slick-prev,
	.slick-next {
		z-index: 1;
		width: 40px;
		height: 40px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		transition: all 0.3s;

		&:hover {
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.slick-prev {
		left: 10px;

		&::after {
			top: 50%;
			left: 50%;
			transform: translate(-25%, -50%) rotate(-45deg);
		}
	}

	.slick-next {
		right: 10px;

		&::after {
			top: 50%;
			left: 50%;
			transform: translate(-75%, -50%) rotate(135deg);
		}
	}

	@media (max-width: 768px) {
		padding: 0 var(--spacing-sm);
	}
`;

// 輪播圖片容器
const CarouselItem = styled.div`
	width: 100%;
	overflow: hidden;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;

		&:hover {
			transform: scale(1.05);
		}
	}
`;

export interface CarouselItem {
	id: number;
	image: string;
	link: string;
	alt: string;
}

interface HomeCarouselProps {
	carouselItems: CarouselItem[];
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({
	carouselItems,
}) => {
	const handleCarouselClick = (link: string) => {
		window.open(link, "_blank");
	};

	return (
		<CarouselContainer>
			<Carousel
				autoplay
				arrows
				dots={true}
				dotPosition="bottom"
				autoplaySpeed={5000}
			>
				{carouselItems.map((item) => (
					<div key={item.id}>
						<CarouselItem onClick={() => handleCarouselClick(item.link)}>
							<img src={item.image} alt={item.alt} />
						</CarouselItem>
					</div>
				))}
			</Carousel>
		</CarouselContainer>
	);
};
