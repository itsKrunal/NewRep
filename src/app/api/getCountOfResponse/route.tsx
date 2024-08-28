import { connect } from "../../../dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import UserModel from '../../../models/user.js';

// Connect to MongoDB using your dbConfig
connect();

export async function GET(request: NextRequest) {
    try {
        // Aggregation pipeline to get total user count and count by department
        const data = await UserModel.aggregate([
            {
                $facet: {
                    totalUsers: [
                        { $count: "total" } // Count total users
                    ],
                    usersByDepartment: [
                        {
                            $group: {
                                _id: { $toLower: '$department' }, // Group by department, case-insensitive
                                count: { $sum: 1 } // Count number of users in each department
                            }
                        }
                    ]
                }
            }
        ]);

        // Extracting results from the aggregation pipeline
        const totalUsersCount = data[0]?.totalUsers[0]?.total || 0;
        const usersByDepartmentArray = data[0]?.usersByDepartment || [];

        // Transform the usersByDepartment array to an object
        const usersByDepartment = usersByDepartmentArray.reduce((acc : any, item : any) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        // Construct the final response object
        const responseData = {
            totalUsers: totalUsersCount,
            ...usersByDepartment
        };

        return NextResponse.json(responseData, { status: 200 });

    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({
            error: err.message,
        }, { status: 500 });
    }
}

export const revalidate = 0;
