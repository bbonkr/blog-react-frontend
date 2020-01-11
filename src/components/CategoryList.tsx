import React, { FunctionComponent } from "react";
import { List, Badge } from "antd";
import Link from "next/link";
import { CategoryModel } from "../typings/dto";

export interface CategoryListProps {
    categories: CategoryModel[];
}

/**
 * 분류 목록을 출력하는 컴포넌트입니다.
 *
 * @param {array} 분류 데이터
 */
const CategoryList: FunctionComponent<CategoryListProps> = ({ categories }) => {
    return (
        <List
            dataSource={categories}
            renderItem={item => {
                return (
                    <List.Item
                        extra={
                            <Badge
                                count={item.posts ? item.posts.length : 0}
                                overflowCount={999}
                            />
                        }
                    >
                        <Link
                            href={{
                                pathname: "/category",
                                query: { slug: item.slug }
                            }}
                            as={`/category/${item.slug}`}
                        >
                            <a>{item.name}</a>
                        </Link>
                    </List.Item>
                );
            }}
        />
    );
};

export default CategoryList;
